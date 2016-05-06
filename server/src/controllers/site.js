/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";
import * as siteService from '../services/site';
import {blankAuth} from '../tools/auth';

export const siteEntrance = function *(next){

        let site = this.query.site;
        let siteEntity = yield siteService.getSiteInfo(site);
        if (!siteEntity){
            throw new Error('site rsNullError 500');
        }

        this._domain = this._domain || {};
        //{type类型, name插件名}
        this._domain.site = siteEntity;
        this._domain.plugin = JSON.parse(siteEntity.site_plugin);

        yield next;
}

export const getSiteByType = function *(next){

    let type = this.query.type;
    let {limit, page} = this.request.body.fields;
    let siteEntitys = yield siteService.getSiteByType(type, parseInt(page), parseInt(limit));
    if (siteEntitys){
        this.body = {
            result: 1,
            data: siteEntitys
        }
    } else {
        throw new Error('site rsNullError 500');
    }   
}

export const getSiteConf = function *(next){
    let {site_name, site_desc, site_image, site_themes, site_id, site_fn} = this._domain.site;
    this.body = {
        result: 1,
        data: {
            site_name,
            site_desc,
            site_image,
            site_fn,
            site_themes,
            site_id
        }
    }
}

export const getSiteContentBySiteId = function *(next){
    let {site, theme, limit, page} = this.query;
    let rs = yield siteService.getSiteContentBySiteId(site, theme, limit, page);
    if (rs){
        rs.data = rs.data.filter(item=>{
            return !!item.author;                               //剔除无效话题
        });
        this.body = rs;
    } else {
        throw new Error('site rsNullError 500');
    }
}

export const getSiteContentByContentId = function *(next){
    let site = this.query.site;
    let contentId = this.params.id;
    let rs = yield siteService.getSiteContentByContentId(site, contentId);
    if (rs && rs.data.author){
        this.body = rs;
    } else {
        throw new Error('site rsNullError 500');
    }
}












