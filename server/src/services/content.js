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

export const getContentByIds = function *(ids, query){
    let rs = yield new Promise((resolve, reject)=>{

        let message = producer.createMessage('ss_content_getContentByContentIds');
        message.setType(producer.MESSAGE_REQUEST);
        message.setParams('ids', ids);
        message.setParams('query', query);
        message.addCallBack({
            success: (result)=>{
                resolve(result.data);
            },
            error: (result)=>{
                reject(result.message);             //name code message data
            }
        });
        producer.sendMessage(message);
    });
    return rs;
}