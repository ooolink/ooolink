/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const consumer = require('fibms-node-client').Consumer();
const producer = require('fibms-node-client').Producer();
import request from 'request'
import {getImageFromContent} from '../../tools'
import contentModelCreate from '../contentModel'

consumer.onMessage('ss_task_getSiteActualContents_cnode', params=>{

});

consumer.onMessage('ss_task_getSiteAllContents_cnode', params=>{
	const themeMap = {
		'share': '分享',
		'ask': '问答',
		'job': '招聘',
		'good': '精华'
	};

	function fetch(n, siteModel){
		request(`https://cnodejs.org/api/v1/topics?page=${n}`, (error, response, body)=>{
			try{
				body = JSON.parse(body);
			} catch (e){
				return _taskLog.error(_log('cnode', 'getSiteAllContents', `body解析错误${e.message}`, __filename, 30));
			}
			if (error || response.statusCode != 200 || !body.success || !body.data){
				if (error){
					return _taskLog.error(_log('cnode', 'getSiteAllContents', '请求错误', __filename, 31));
				} 
				if (response.statusCode != 200){
					return _taskLog.error(_log('cnode', 'getSiteAllContents', `状态码为${response.statusCode}`, __filename, 34));
				}
				if (!body.success || !body.data){
					return _taskLog.error(_log('cnode', 'getSiteAllContents', `数据抓取不成功,第${n}次`, __filename, 37));
				}
			} else {
				if (body.data && body.data.length === 0){
					return _taskLog.info(_log('cnode', 'getSiteAllContents', `全部数据抓取完毕,第${n}次`, __filename, 41));
				} else { 
					body.data.forEach(d=>{
						let model = contentModelCreate();
						model.content_id = `${params.site.site_id}_${d.id}`;
						model.site_id = params.site.site_id;
						model.title = d.title;
						model.desc = '';
						model.content = d.content;
						model.image = getImageFromContent(d.content);
						model.theme = d.tab ? [d.tab]: [];
						d.tab && themeMap[d.tab] && model.theme.push(themeMap[d.tab]);
						if (d.good){
							model.theme.push('good');
							model.theme.push('精华');
						}
						if (d.top){
							model.theme.push('top');
							model.theme.push('置顶');
						}
						model.created = d.create_at;
						model.updated = d.last_reply_at;
						model.url = `https://cnodejs.org/topic/${d.id}`;
						model.author.author_id = `${params.site.site_id}_${d.author.id}`;
						model.author.author_loginname = d.author.loginname;
						model.author.author_name = d.author.loginname;
						model.author.author_avatar = d.author.avatar_url || '';
						model.quantity.view_avetime_general = d.content.length / 20; 				//20字/s
						let type = JSON.parse(siteModel.config.config_native).site_type.split(',');
						type.length && (model.classes.specific_class = type);
						let message = producer.createMessage('ss_content_setContent');
						message.setParams('content', model);
						producer.sendMessage(message);
					});
                    fetch(n+1, siteModel);
				}
			}
		});
	}

	let message = producer.createMessage('ss_site_getSiteById');
	message.setType(producer.MESSAGE_REQUEST);
	message.setParams('site', {site_id: params.site.site_id});
	message.addCallBack({
		success:(rs)=>{
			if (rs && rs.result){
				fetch(1, rs.data);
			}
		},
		error:()=>{

		}
	});
	producer.sendMessage(message);
});









