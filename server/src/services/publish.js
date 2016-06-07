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

export const getPublishType = function *(site){
    let rs = yield new Promise((resolve, reject)=>{
        let message = producer.createMessage(`ext_publish_getType_${site}`);
        message.setType(producer.MESSAGE_REQUEST);
        message.addCallBack({
            success: (result)=>{
                resolve(result);
            },  
            error: (result)=>{
                reject(result.message);
            }
        });
        producer.sendMessage(message);
    });

    return rs;
}

export const publishContent = function *(site, title, content, theme, extToken){
    let rs = yield new Promise((resolve, reject)=>{
        let message = producer.createMessage(`ext_publish_content_${site}`);
        message.setType(producer.MESSAGE_REQUEST);
        message.setParams('title', title);
        message.setParams('content', content);
        message.setParams('theme', theme);
        message.setParams('token', extToken);
        message.addCallBack({
            success: (result)=>{
                resolve(result);
            },
            error: (result)=>{
                reject(result.message);
            }
        });
        producer.sendMessage(message);
    });

    return rs;
}

