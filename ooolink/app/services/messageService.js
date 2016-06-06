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

export function getPlatformMessage(token, cb){
    fetch(`${SERVER_ADDRESS}message/platform`,{
        headers: {
            'x-access-token': token
        }
    })
    .then(responseAuth(token=>{
            getPlatformMessage(token, cb);
        }, cb))
    .then(rs=>{
        cb(rs);
    })
}