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
    let focus = yield collectService.changeFocusSiteStatus(siteId, userId, 1);
    if (focus === true || focus === false){
        this.body = {
            result: 1
        }
    } else {
        throw new Error('focus operateError 500');
    }
}

export const unCollectSite = function *(next){
    let siteId = this.request.body.fields.site;
    let userId = this._domain.user.id;
    let focus = yield collectService.changeFocusSiteStatus(siteId, userId, 0);
    if (focus === true || focus === false){
        this.body = {
            result: 1
        }
    } else {
        throw new Error('focus operateError 500');
    }
}

export const isCollectedSite = function *(next){
    let site = this.query.site;
    let userId = this._domain.user.id;
    let status = yield collectService.getFocusSiteStatus(site, userId);
    this.body = {
        result: 1,
        data: status
    }
}

export const collectContent = function *(next){
    let contentid = this.request.body.fields.contentid,
        userid = this._domain.user.id,
        type = this.request.body.fields.type;

    let collection = yield collectService.changeCollectionContentStatus(contentid, userid, type, 1);
    if (collection === true || collection === false){
        this.body = {
            result: 1
        }
    } else {
        throw new Error('collect operateError 500');
    }
}

export const unCollectContent = function *(next){
    let contentid = this.request.body.fields.contentid,
        userid = this._domain.user.id;

    let collection = yield collectService.changeCollectionContentStatus(contentid, userid, null, 0);
    if (collection === true || collection === false){
        this.body = {
            result: 1
        }
    } else {
        throw new Error('collect operateError 500');
    }
}

export const isCollectedContent = function *(next){
    let contentId = this.query.contentid;
    let userId = this._domain.user.id;
    let status = yield collectService.getCollectionContentStatus(userId, contentId);
    this.body = {
        result: 1,
        data: status
    }
}







