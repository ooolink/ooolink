/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as siteService from './services/site';
import {getFastCache} from './services/cache';

class Controller {
    getTheme;
    getTopic;
}

export default Controller;

const templatecnode = require('./sites/template-cnode/controller');
const templateSites = {
    templatecnode
};

function * searchSiteConfig (siteId) {
    let rs = getFastCache().get('siteconfig-' + siteId);
    if (rs){
        let prs = JSON.parse(rs);
        return {
            site_config: JSON.parse(prs.site_config),
            site_plugin: JSON.parse(prs.site_plugin)
        };
    } else {
        let sites = yield siteService.siteConfigGet(siteId);
        let {site_config, site_plugin} = sites;
        let rs = {
            site_config,
            site_plugin
        }
        getFastCache().set('siteconfig-' + siteId, JSON.stringify(rs));
        return {
            site_config: JSON.parse(site_config),
            site_plugin: JSON.parse(site_plugin)
        };
    }
}

const route = function *(cb) {
    "use strict";
    let site = this.params.site;
    if (this._domain && this._domain.pluginName){
        site = this._domain.pluginName;
    }
    if (this._domain && this._domain.pluginName) {
        return {
            plugin: require(`./sites/${site}/controller`)
        }
    } else {
        let {site_config, site_plugin} = yield searchSiteConfig(site);
        switch (site_plugin.type){
            case 'template':    
                let templateType = site_plugin.name.split('-').pop();
                return {
                    plugin: templateSites[`template${templateType}`],
                    params: {domain: site_config.domain}
                }
            case 'rss': break;
        }
    }
};

export function * getSiteConf() {
    "use strict";
    yield siteService.siteGet.call(this);
}

export function * getThemes() {
    "use strict";
    yield siteService.siteThemesGet.call(this);
}

export function * getTheme() {
    "use strict";
    let m = yield route.call(this);
    yield m.plugin.getTheme.call(this, m.params);
}

export function * getTopic() {
    "use strict";
    let m = yield route.call(this);
    yield m.plugin.getTopic.call(this, m.params);
}

