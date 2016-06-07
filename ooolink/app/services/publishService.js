/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import {SERVER_ADDRESS} from '../constants/config';
import {responseAuth} from './base';

export function getPublishType(site, cb){
    fetch(`${SERVER_ADDRESS}publish/type?site=${site}`)
    .then(response=>{
        return response.json()
    })
    .then(rs=>{
        cb(rs);
    });
}

export function publishContent(token, title, content, theme, site, extToken, cb){
    fetch(`${SERVER_ADDRESS}publish`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'x-access-token': token
        },
        body: `title=${title}&content=${content}&theme=${theme}&site=${site}&extToken=${extToken}`
    })
        .then(responseAuth(token=>{
            publishContent(token, title, content, theme, site, extToken, cb);
        }, cb))
        .then(rs=> {
            cb(rs);
        });
}