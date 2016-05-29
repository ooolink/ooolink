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
import {getFastCache} from './cache';

export const getSiteByType = function *(type, pageNumber, limit){
	let sites = yield Sites.findAll({
		attributes: ['site_name', 'site_desc', 'site_image', 'site_id', 'site_created', 'site_updated'],
		limit,
		offset: limit * pageNumber,
		where: {
			site_type: type
		}
	});
	return sites;
}

export const getSiteInfo = function *(siteid){
		let key = `site_getSiteInfo_${siteid}`,
			memrs = getFastCache().get(key);
		if (memrs){
			return memrs;
		}
        let doc = Array.isArray(siteid) ? {where: {site_id: {in: siteid}}} : {where: {site_id: siteid}};
		
        let sites = yield Sites.findAll(doc);
        if (!sites.length){
            return false;
        }
        sites.forEach(site=>{
            getFastCache().set(`site_getSiteInfo_${site.site_id}`, site);
        });

        if (!Array.isArray(siteid)){
            return sites[0];
        } else {
            return sites;
        }
};

export const siteThemesGet = function *(){
		let site = this.params.site;
		let sites = yield Sites.findOne({
			attributes: ['site_themes'],
			where: {
				site_id: site
			}
		});
		this.body = String(sites.site_themes).split(',');
};

export const siteConfigGet = function *(siteId){
		let sites = yield Sites.findOne({
			attributes: ['site_config', 'site_plugin'],
			where: {
				site_id: siteId
			}
		})
		return sites;
};

export const getSiteContentBySiteId = function *(site, theme, limit, page){
    let rs = yield new Promise((resolve, reject)=>{
        let message = producer.createMessage('ss_content_getContentBySiteId');
        message.setType(producer.MESSAGE_REQUEST);
        message.setParams('site', {
            site_id: site,
            theme,
            limit,
            page
        });
        message.addCallBack({
            success:(result)=>{
                resolve(result);
            },
            error: (result)=>{
                reject(result);			//TODO 错误捕获
            }
        });
        producer.sendMessage(message);
    });
    return rs;
}

export const getSiteContentByContentId = function *(site, id){
    let rs = yield new Promise((resolve, reject)=>{
        let message = producer.createMessage('ss_content_getContentByContentId');
        message.setType(producer.MESSAGE_REQUEST);
        message.setParams('content', {
            site_id: site,
            content_id: id
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







