/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";
import Sites from '../models/sites';

export const searchHot = function*() {
    let sites = yield Sites.findAll({
        attributes: ['site_name', 'site_id', 'site_desc', 'site_image'],
        limit: 10
    });

    return sites;
};

export const searchSites = function*(searchValue) {
    let sites = yield Sites.findAll({
        attributes: ['site_name', 'site_id', 'site_desc', 'site_image'],
        where: {
            $or: [{
                site_name: {
                    $like: `%${name}%`
                }
            }, {
                site_id: {
                    $like: `%${name}%`
                }
            }, {
                site_desc: {
                    $like: `%${name}%`
                }
            }]
        },
        limit: 10
    });

    return sites;
};