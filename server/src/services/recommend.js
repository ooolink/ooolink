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

export const getOneRecommend = function *(time){
    let rs = yield new Promise((resolve, reject)=>{
        let message = producer.createMessage('ss_recommend_getWelcome');
        message.setType(producer.MESSAGE_REQUEST);
        message.setParams('recommend', {
            time,
            location: '重庆',
            user:{

            }
        });
        message.addCallBack({
            success: (result)=>{
                resolve(result);
            },
            error: (result)=>{
                reject(result.message);                     //TODO 错误机制
            }
        });
        producer.sendMessage(message);
    });
    return rs;
}

export const getSeaGlobalContents = function *(page){
    let rs = yield new Promise((resolve, reject)=>{
        let message = producer.createMessage('ss_indexes_getSeaContents');
        message.setType(producer.MESSAGE_REQUEST);
        message.setParams('page', page);
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

    let result = [];
    if (rs){
        Object.keys(rs.data).forEach(key=>{
            result[parseInt(key.split('_')[4])] = JSON.parse(rs.data[key]);
        });
    }
    return {
        result: rs.result,
        data: result
    }
}





