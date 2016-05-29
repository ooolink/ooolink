/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import {SERVER_ADDRESS} from '../constants/config';
import {getGlobal, setGlobal} from '../store'

export function getSiteByType(type, page, limit, cb){
    "use strict";
    fetch(`${SERVER_ADDRESS}sites?type=${type}&page=${page}&limit=${limit}`, {
        method: "GET"
    })
        .then(response=> {
            if (response.status === 200) {
                return response.json();
            } else {
                cb({result: 0});
            }
        })
        .then(rs=> {
            cb(rs);
        });
}