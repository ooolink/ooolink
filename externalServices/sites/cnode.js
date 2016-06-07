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
var request = require('request');

consumer.onRequestService('ext_publish_getType_04be9c7c2e7f7eda6febba12aa579a8d', (params, successFunc, errorFunc)=>{
    
    //cnode
        return successFunc({
            result: 1,
            data: [{
                name: '问答',
                theme: 'ask'
            }, {
                name: '分享',
                theme: 'share'
            }, {
                name: '招聘',
                theme: 'job'
            }]
        });
});

consumer.onRequestService('ext_publish_content_04be9c7c2e7f7eda6febba12aa579a8d', (params, successFunc, errorFunc)=>{
    var form = {
        form: {
            accesstoken: params.token,
            title: params.title,
            tab: params.theme,
            content: params.content
        }
    };
    request.post('https://cnodejs.org/api/v1/topics', form, (error, httpResponse, body)=>{
        console.log(body);
        if (JSON.parse(body).success){
            successFunc({result: 1});
        } else {
            successFunc({result: 0});
        }
    });
});

consumer.onRequestService('ext_user_checkToken_04be9c7c2e7f7eda6febba12aa579a8d', (params, successFunc, errorFunc)=>{
    request.post('https://cnodejs.org/api/v1/accesstoken', {form:{accesstoken: params.token}}, (error, httpResponse, body)=>{
        if (JSON.parse(body).success){
            successFunc({result: 1});
        } else {
            successFunc({result: 0});
        }
    });
});