/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const config = require('../../../config.json');
const consumer = require('fibms-node-client').Consumer();
const producer = require('fibms-node-client').Producer();
import md5 from 'md5'
import request from 'request'
import FeedParser from 'feedparser'
import contentModelCreate from '../contentModel'
import {getImageFromContent, getDescFromContent} from '../../tools'

consumer.onMessage('ss_task_getSiteActualContents_rss', params=>{

});

consumer.onMessage('ss_task_getSiteAllContents_rss', params=>{
    function fetch(siteModel, nativeSite){
        request(siteModel.fetch_address).
        pipe(new FeedParser()).
        on('data',(d)=>{
            let model = contentModelCreate();

            //屏蔽没有内容的信息
            if (!d.description){
                return;
            }

            model.content_id = `${params.site.site_id}_${md5(d.link)}`;
            model.site_id = params.site.site_id;
            model.title = d.title;
            model.content = d.description.substr(0, 1) !== '<' ? `<p>${d.description}</p>` : d.description;
            if (!d.summary || d.summary.length > 200 || d.summary.length == 0) {
                let r = getDescFromContent(d.description);
                model.desc = r.desc; 
                //纯文本客户端处理有问题
                if (r.contentType === 'text'){
                    model.content = '<p>' + model.content + '</p>';
                }
            } else {
                model.desc = d.summary;
            }
            model.image = getImageFromContent(d.description);
            model.theme = [];
            model.created = d.pubdate || new Date();
            model.updated = d.pubdate || model.created;
            model.url = d.link;
            model.author.author_id = d.author ? `${params.site.site_id}_${md5(d.author)}` : params.site.site_id;
            model.author_loginname = d.author || nativeSite.site_name;
            model.author_name = d.author || nativeSite.site_name;
            model.author_avatar = '';
            model.quantity.view_avetime_general = d.description.length / 20;
            let type = JSON.parse(siteModel.config.config_native).site_type.split(',');
            type.length && (model.classes.specific_class = type);
            let message = producer.createMessage('ss_content_setContent');
            message.setParams('content', model);
            producer.sendMessage(message);
        }).
        on('end', ()=>{
            _taskLog.info(_log('rss', 'getSiteAllContents', `siteid:${siteModel.site_id}全部数据抓取完毕`, __filename, 49));
        }).
        on('error', (error)=>{
            if (config.debug){
                throw error;
            }
            console.log(error.message);
        });
    }

    let message = producer.createMessage('ss_site_getSiteById');
    message.setType(producer.MESSAGE_REQUEST);
    message.setParams('site', {site_id: params.site.site_id});
    message.addCallBack({
        success:(rs)=>{
            if (rs && rs.result){
                let nativeSite = JSON.parse(rs.data.config.config_native);
                fetch(rs.data, nativeSite);
            }
        },
        error:()=>{

        }
    });
    producer.sendMessage(message);
});
