/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const ContentCreate = require('../models').Content;

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














