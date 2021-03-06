/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const ContentCreate = require('../models').Content;
const Site = require('../models').Site;
const producer = require('fibms-node-client').Producer();
import {setSearchIndex} from '../search/services';

export default function(consumer){
	consumer.onMessage('ss_content_setContent', params=>{
		let as = params.content.site_id.substr(0, 2).toLowerCase(),
			Content = ContentCreate(as),
			content_id = params.content.content_id;

		let conditions = {
			content_id
		};
		let doc = params.content;
		Content.update(conditions, doc ,{upsert : true}, function(err, raw){
			if (err){
				_modelLog.error(_log('content', 'setContent', '添加content失败', __filename, 22));
			}
		});

		//暂时不支持内容 content 搜索
		setSearchIndex(content_id, doc.title, doc.desc);

		//内容更新
		//TODO 需要表明时新内容还是更新内容 2016.6.4
		let message = producer.createMessage('ss_content_new');
		message.setType(producer.MESSAGE_GROUP);
		message.setParams('content', params.content);
		producer.sendMessage(message);
	});

	consumer.onRequestService('ss_content_getContentByContentId', (params, successFunc, errorFunc)=>{
		let as = params.content.site_id.substr(0, 2).toLowerCase(),
			Content = ContentCreate(as);

		let {content_id} = params.content;
		Content.findOne({content_id: content_id}, {site_id: 0}, {lean: true}).exec((err, content)=>{
			if (err || !content){
				_modelLog.error(_log('content', 'getContentByContentId', '通过ID获取content失败', __filename, 35));
				errorFunc('rsNullError');
			} else {
				successFunc({result: 1, data: content});
			}
		});

		//浏览数+1
		Content.update({content_id},{$inc:{"quantity.view_count": 1}}).
			exec((err, content)=>{
				if (err){
					_modelLog.error(_log('content', 'getContentByContentId', `获取内容后，更新浏览数失败, ${err.message}`, __filename, 58));
				}
			});
	});

	consumer.onRequestService('ss_content_getContentByContentIds', (params, successFunc, errorFunc)=>{
		let contentIds = params.ids;
		let query = params.query ? params.query : {site_id: 0};
		let map = {};
		contentIds.forEach(id=>{
			let diffId = id.split('_');
			if (map[diffId[0]]){
				map[diffId[0]].push(id);
			} else {
				map[diffId[0]] = [id];
			}
		});

		let contentGroup = [],
			sites = Object.keys(map),
			flag = 0,
			errorFlag = false;

		sites.forEach(site_id=>{
			let content_ids = map[site_id];
			let Content = ContentCreate(site_id.substr(0, 2).toLowerCase());
			Content.find({}, query, {lean: true})
				.where('content_id').in(content_ids)
				.exec((err, contents)=>{
					if (errorFlag){
						return;
					} else if (err){
						errorFlag = true;
						_modelLog.error(_log('content', 'getContentByContentIds', err.message, __filename, 75));
						errorFunc('modelError');
						return;
					}
					contentGroup = contentGroup.concat(contents);
					flag++;
					if (flag === sites.length){
						successFunc({result: 1, data: contentGroup});
					}
				});
		});
	});

	consumer.onRequestService('ss_content_getContentBySiteId', (params, successFunc, errorFunc)=>{
		let as = params.site.site_id.substr(0, 2).toLowerCase(),
			Content = ContentCreate(as);
		let limit = params.site.limit || 20,
			page = params.site.page || 0;
		
		limit = parseInt(limit);
		page = parseInt(page);

		let condition = {site_id: params.site.site_id};
		if (params.site.theme != '_all_'){
			condition = {site_id: params.site.site_id, theme: {$in:[params.site.theme]}};
		}
		Content.find(condition, {content: 0, site_id: 0}, {lean: true}).
		skip(limit * page).
		limit(limit).
		sort({updated: -1}).
		exec((err, contents)=>{
			if (err || !contents.length){
				err && _modelLog.error(_log('content', 'getContentBySiteId', `通过siteId获取content失败,${err.message}`, __filename, 49));
				errorFunc('rsNullError');
			} else {
				successFunc({result: 1, data: contents});
			}
		});
	});

	//TODO 需要重写
	consumer.onRequestService('ss_content_getContentBySiteIds', (params, successFunc, errorFunc)=>{
		let {ids, page, limit, query} = params;
		let aveLimit = Math.round(limit / ids.length);
		let data = [], num = 0, errorFlag = false;
		if (ids.length === 0){
			return errorFunc('rsNullError');
		}
		ids.forEach(id=>{
			let Content = ContentCreate(id.substr(0, 2).toLowerCase());
			Content.find({site_id: id}, query, {lean: true})
			.limit(aveLimit)
			.exec((err, contents)=>{
				if (errorFlag){return;}
				if (err){
					errorFlag = true;
					return errorFunc('rsNullError');
				}
				data = [...data, ...contents];
				num++;
				if (num === ids.length){
					successFunc({
						result: 1,
						data
					});
				}
			});
		})
	});

	consumer.onGroupMessage('global_content_incCommentNumber', params=>{
		let content_id = params.contentid;
		let site_id = content_id.split('_')[0],
			Content = ContentCreate(site_id.substr(0, 2).toLowerCase());

		Content.update({content_id}, {$inc: {"quantity.comment_count": 1}}).
			exec((err, contents)=>{
				if (err){
					_modelLog.error(_log('content', 'incCommentNumber', `comment_count加1-${err.message}`, __filename, 120));
				}
			});
	});

	consumer.onGroupMessage('global_content_decCommentNumber', params=>{
		let content_id = params.contentid;
		let site_id = content_id.split('_')[0],
			Content = ContentCreate(site_id.substr(0, 2).toLowerCase());

		Content.update({content_id}, {$inc: {"quantity.comment_count": -1}}).
			exec((err, contents)=>{
				if (err){
					_modelLog.error(_log('content', 'incCommentNumber', 'comment_count减1', __filename, 120));
				}
			});
	});

	consumer.onGroupMessage('global_content_incCollectionNumber', params=>{
		let content_id = params.contentid;
		let site_id = content_id.split('_')[0],
			Content = ContentCreate(site_id.substr(0, 2).toLowerCase());

		Content.update({content_id}, {$inc: {"quantity.collect_count": 1}}).
			exec((err, contents)=>{
				if (err){
					_modelLog.error(_log('content', 'incCollectionNumber', 'collect_count加1', __filename, 120));
				}
			});
	});

	consumer.onGroupMessage('global_content_decCollectionNumber', params=>{
		let content_id = params.contentid;
		let site_id = content_id.split('_')[0],
			Content = ContentCreate(site_id.substr(0, 2).toLowerCase());

		Content.update({content_id}, {$inc: {"quantity.collect_count": -1}}).
			exec((err, contents)=>{
				if (err){
					_modelLog.error(_log('content', 'incCollectionNumber', 'collect_count减1', __filename, 120));
				}
			});
	});

	//TODO 需要重写
	consumer.onRequestService('ss_content_getContentsByViewCount', (params, successFunc, errorFunc)=>{
		Site.find({}, {site_id: 1}, {lean: true}).exec((err, sites)=>{			//TODO Error
			let data = [], number = 0;
			sites.forEach(site=>{
				let Content = ContentCreate(site.site_id.substr(0, 2).toLowerCase());
				Content.find({}, {content: 0}, {lean: true})
				.limit(6)
				.sort({"quantity.view_count": -1})
				.exec((err, contents)=>{
					data = [...data, ...contents];
					number ++;
					if (number === sites.length){
						successFunc({
							result: 1,
							data
						});
					}
				});
			});
		});
	});
}














