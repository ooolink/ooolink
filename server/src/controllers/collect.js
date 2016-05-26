/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";

import * as collectService from '../services/collect';

export const collectSite = function *(next){
    let siteId = this.request.body.fields.site;
    let userId = this._domain.user.id;
    let focus = yield collectService.focusSite(siteId, userId);
    if (focus){
        this.body = {
            result: 1
        }
    } else {
        throw new Error('focus operateError 500');
    }
}

export const unCollectSite = function *(next){

}

export const isCollectedSite = function *(next){

}

export const collectContent = function *(next){

}

export const unCollectContent = function *(next){

}

export const isCollectedContent = function *(next){
    
}