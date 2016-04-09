/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as siteService from './services/site';
class Controller {
    getTheme;
    getTopic;
}

export default Controller;

const route = function(cb) {
    "use strict";
    let site = this.params.site;
    if (this._domain && this._domain.pluginName){
        site = this._domain.pluginName;
    }
    if (site === 'default') {
        return require(`./default/controller`);
    } else {
        return require(`./sites/${site}/controller`);
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
    let m = route.call(this);
    yield m.getTheme.call(this);
}

export function * getTopic() {
    "use strict";
    let m = route.call(this);
    yield m.getTopic.call(this);
}

