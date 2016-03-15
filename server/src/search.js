/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import fs from 'fs';
const famousNumber = 5;
const SITES = fs.readdirSync(`${__dirname}/sites/`);

export const getFamous = function *() {
    this.body = SITES.slice(0, famousNumber);
};

export const getSiteByType = function *() {
    "use strict";
    let type = this.query.type,
        name = this.query.name;
    switch (type) {
        case 'all':
            this.body = !~SITES.indexOf(name) ? [] : [name];
            break;
    }
};