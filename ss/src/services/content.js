/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const ContentCreate = require('../models').Content;
const producer = require('fibms-node-client').Producer();

export default function(consumer){
	consumer.onMessage('ss_content_setContent', params=>{
		let as = params.content.site_id.substr(0, 2).toLowerCase(),
			Content = ContentCreate(as);

		let conditions = {
			content_id: params.content.content_id
		};
		let doc = params.content;
		Content.update(conditions, doc ,{upsert : true}, function(err, raw){
			if (err){
				_modelLog.error(_log('content', 'setContent', '添加content失败', __filename, 22));
			}
		});

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
				_modelLog.error(_log('content', 'getContentBySiteId', '通过siteId获取content失败', __filename, 49));
				errorFunc('rsNullError');
			} else {
				successFunc({result: 1, data: contents});
			}
		});
	});
}














