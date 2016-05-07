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

export const getOneRecommend = function *(next){
    let rs = yield new Promise((resolve, reject)=>{
        let message = producer.createMessage('ss_content_getContentByContentId');
        message.setType(producer.MESSAGE_REQUEST);
        message.setParams('content', {
            site_id: '04be9c7c2e7f7eda6febba12aa579a8d',
            content_id: '04be9c7c2e7f7eda6febba12aa579a8d_54c58bc40d075f173d433f23'
        });
        message.addCallBack({
            success: (result)=>{
                resolve(result);
            },
            error: (result)=>{
                reject(result);
            }
        });
        producer.sendMessage(message);
    });
    return rs;
}