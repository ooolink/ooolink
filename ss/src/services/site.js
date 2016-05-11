/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const Site = require('../models').Site;

export default function(consumer){

	consumer.onRequestService('ss_site_getSites', (params, successFunc, errorFunc)=>{
		Site.find({},{lean: true}).exec((err, sites)=>{
			if (err || !sites){
				_modelsLog.error(_log('site', 'getSites', '获取site失败', __filename, 16));
				errorFunc({result: 0, error: 'rsNullError'});
			} else {
				successFunc({result: 1, data: sites});
			}
		});
	});

	consumer.onRequestService('ss_site_getSiteById', (params, successFunc, errorFunc)=>{
		Site.find({site_id: params.site.site_id}, {}, {lean: true}).exec((err, sites)=>{
			if (err || !sites){
				_modelsLog.error(_log('site', 'getSiteById', '获取site失败', __filename, 27));
				errorFunc({result: 0, error: 'rsNullError'});
			} else {
				successFunc({result: 1, data: sites[0]});
			}
		});
	});

	consumer.onMessage('ss_site_setSite', params=>{
		Site.update({site_id: params.site.site_id}, params.site, {upsert : true}, (err, raw)=>{
			if (err){
				_modelsLog.error(_log('site', 'setSite', '设置site失败', __filename, 35));
			}
		});
	});
}