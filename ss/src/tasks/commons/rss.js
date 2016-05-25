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
import md5 from 'md5'
import request from 'request'
import FeedParser from 'feedparser'
import contentModelCreate from '../contentModel'
import {getImageFromContent} from '../../tools'

consumer.onMessage('ss_task_getSiteActualContents_rss', params=>{

});

consumer.onMessage('ss_task_getSiteAllContents_rss', params=>{
    function fetch(siteModel){
        request(siteModel.fetch_address).
        pipe(new FeedParser()).
        on('data',(d)=>{
            let model = contentModelCreate();
            model.content_id = `${params.site.site_id}_${md5(d.link)}`;
            model.site_id = params.site.site_id;
            model.title = d.title;
            model.desc = d.summary || '';
            model.content = d.description;
            model.image = getImageFromContent(d.description);
            model.theme = [];
            model.created = d.pubdate;
            model.updated = d.pubdate;
            model.url = d.link;
            model.author.author_id = `${params.site.site_id}_${md5(d.author)}`;
            model.author_loginname = d.author;
            model.author_name = d.author;
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
            console.log(error);
        });
    }

    let message = producer.createMessage('ss_site_getSiteById');
    message.setType(producer.MESSAGE_REQUEST);
    message.setParams('site', {site_id: params.site.site_id});
    message.addCallBack({
        success:(rs)=>{
            if (rs && rs.result){
                fetch(rs.data);
            }
        },
        error:()=>{

        }
    });
    producer.sendMessage(message);
});
