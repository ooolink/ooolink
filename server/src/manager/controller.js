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












