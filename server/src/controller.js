/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

class Controller {
    getThemes;
    getTheme;
    getTopic;
}

export default Controller;

const route = function(cb) {
    "use strict";
    var site = this.params.site;

    if (site === 'default') {
        return require(`./default/controller`);
    } else {
        return require(`./sites/${site}/controller`);
    }
};

export function * getThemes() {
    "use strict";
    let m = route.call(this);
    yield m.getThemes.call(this);
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