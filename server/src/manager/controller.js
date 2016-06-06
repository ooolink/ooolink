/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import md5 from 'md5';
import * as siteService from './services/site';
import * as recommendService from './services/recommend';
import * as contentService from './services/content';
import * as messageService from './services/message';
const consumer = require('fibms-node-client').Consumer();
const producer = require('fibms-node-client').Producer();

export const indexRender = function *(next){
    let sites = yield siteService.siteFindAll();
    let obj = {
        sites
    };
    yield this.render('index', {
        data: JSON.stringify(obj)
    });
}

export const siteAdd = function *(next){
    let {name, desc, image, themes, fn, type, plugintype, enname, pluginname, rssurl, domain} = this.request.body.fields;
    let {period, fetch_adapter, themesmap} = this.request.body.fields;
    themes = JSON.stringify({
        themes: themes.split(','),
        themesmap: themesmap.split(',')
    });
    let site_id, site_plugin, site_config;
    site_id = md5(enname + name);
    site_plugin = JSON.stringify({
        plugintype,
        pluginname,
        rssurl,
        domain
    });
    site_config = JSON.stringify({
        period
    });
    let rs = yield siteService.siteAdd(name, desc, image, themes, fn, type, site_id, site_plugin, site_config);
    if (rs.id){
        this.body = {
            result: 1,
            data: {
                site_id
            }
        }
    } else {
        this.body = {
            result: 0
        }
    }
    let message = producer.createMessage('ss_site_setSite');
    let siteModel = {
        site_id,
        fetch_type:plugintype,
        fetch_plugin: pluginname,
        fetch_address: domain || rssurl || '',
        fetch_adapter: fetch_adapter || '',
        config: {
            config_native: JSON.stringify(rs.dataValues),
            config_plugin: '',
            config_period: parseInt(period),
            config_flow: ['anaylize']
        }
    }
    message.setParams('site', siteModel);
    producer.sendMessage(message);
}

export const siteGet = function *(next){
    this.body = {
        result: 1,
        data: yield siteService.siteFindAll()
    }
}

export const setRecommend = function *(next){

    let {id, type, title} = this.request.body.fields;
    let rs = yield recommendService.setContentArtificial(id, type, title);
    this.body = {
        result: 1
    }
}

export const contentGet = function *(next){

    let {page, limit, site} = this.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let contents = yield contentService.getSiteContentBySiteId(site, '_all_', limit, page);
    this.body = {
        result: 1,
        data: contents.data
    }
}

export const recommendGet = function *(next){
    let contents = yield recommendService.getContentArtificial();
    let ids = [],
        data = [];

    let map = {};
    contents.forEach(item=>{
        map[item.mixed_id] = item.dataValues;
        ids.push(item.mixed_id);
    });

    if (ids.length){
        let cnts = yield contentService.getContentByIds(ids, {content: 0});
        cnts.forEach(cnt=>{
            map[cnt.content_id].content = cnt;
            data.push(map[cnt.content_id]);
        });
    }

    this.body = {
        result: 1,
        data
    }
}

export const recommendDel = function *(next){
    let {mixed_id} = this.request.body.fields;
    let rs = yield recommendService.delContentArtificial(mixed_id);
    this.body = {
        result: 1
    }
}


export const messageGet = function *(next){
    let messages = yield messageService.getMessage({where: {message_origin: 'platform'}});
    this.body = {
        result: 1,
        data: messages
    }
}

export const messageSet = function *(next){
    let {content, title} = this.request.body.fields;
    let rs = yield messageService.setMessage('notice', 'platform', 'platform', 'all', title, content);
    this.body = {
        result: 1
    }
}


















