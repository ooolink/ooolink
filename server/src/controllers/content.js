/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";
import * as siteServices from '../services/site';
import * as contentServices from '../services/content';

export const getContentsByType = function *(next){
    let {type, limit, page} = this.query;

    limit = parseInt(limit);
    page = parseInt(page);

    //0 和 10 是暂时写法
    let sites = yield siteServices.getSiteByType(type, 0, 10);
    let ids = [];
    sites.forEach(site=>{
        ids.push(site.site_id);
    });

    let contents = yield contentServices.getContentsBySiteids(ids, page, limit);

    this.body = {
        result: 1,
        data: contents
    }
}