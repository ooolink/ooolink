/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import {SERVER_ADDRESS} from '../constants/config';

export function searchSite(value = '', type = '', cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}search?type=${type}&name=${value}`,{
        method: 'POST',
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body:''
    })
        .then(response => response.json())
        .then(sites => {
            cb && cb(sites);
        });
}

export function searchContentByKeyword(value, cb) {
    "use strict";
    if (!value){
        return cb(null);
    }
    fetch(`${SERVER_ADDRESS}search`,{
        method: 'POST',
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body:`type=keyword&content=${value}`
    })
        .then(response => response.json())
        .then(rs => {
            if (rs && rs.result === 1){
                cb && cb(rs.data);
            } else {
                cb(null);
            }
        });
}


