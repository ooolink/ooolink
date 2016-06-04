/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";
const consumer = require('fibms-node-client').Consumer();
const producer = require('fibms-node-client').Producer();
import Sites from '../models/sites';

export const searchHot = function*() {
    let sites = yield Sites.findAll({
        attributes: ['site_name', 'site_id', 'site_desc', 'site_image'],
        limit: 10
    });

    return sites;
};

export const searchSites = function*(searchValue) {
    let sites = yield Sites.findAll({
        attributes: ['site_name', 'site_id', 'site_desc', 'site_image'],
        where: {
            $or: [{
                site_name: {
                    $like: `%${name}%`
                }
            }, {
                site_id: {
                    $like: `%${name}%`
                }
            }, {
                site_desc: {
                    $like: `%${name}%`
                }
            }]
        },
        limit: 10
    });

    return sites;
};

export const searchKeyword = function *(keyword){
    let rs = yield new Promise((resolve, reject)=>{

        let message = producer.createMessage('ss_search_searchKeyword');
        message.setType(producer.MESSAGE_REQUEST);
        message.setParams('keyword', keyword);
        message.addCallBack({
            success: (result)=>{
                resolve(result.data);
            },
            error: (result)=>{
                reject(result.message);
            }
        });
        producer.sendMessage(message);
    });
    return rs;
}

















