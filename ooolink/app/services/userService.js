/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as loginService from './loginService';
import {SERVER_ADDRESS} from '../constants/config';
import {getGlobal, setGlobal, removeGlobal} from '../store';
import {responseAuth} from './base';

export function getUserInfo(token, cb){
    fetch(`${SERVER_ADDRESS}user/profile`, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
        .then(responseAuth(token=>{
            getUserInfo(token, cb);
        }, cb))
        .then(rs=>{
            rs && rs.result === 1 && setGlobal('userInfo', rs.data);
            cb(rs);
        });
}

export function updateUserInfo(token, infos, cb){
    let infosBody = encodeURIComponent(JSON.stringify(infos));
    fetch(`${SERVER_ADDRESS}user/profile`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'x-access-token': token
        },
        body: `infos=${infosBody}`
    })
        .then(responseAuth(token=>{
            updateUserInfo(token, infos, cb);
        }, cb))
        .then(rs=>{
            rs && rs.result === 1 && setGlobal('userInfo', infos);
            cb(rs);
        })
}