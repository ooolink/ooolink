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
import {getGlobal, setGlobal} from '../store';
import {responseAuth} from './base';

export function publishComment(token, content, contentid, replyid=-1, cb){
    fetch(`${SERVER_ADDRESS}comment`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": token            
        },
        body: `content=${content}&contentid=${contentid}&replyid=${replyid}`
    })
        .then(responseAuth(token=>{
            publishComment(toke, content, contentid, replyid, cb);
        }, cb))
        .then(rs=>{
            cb(rs);
        });
}

export function getComments(contentid, page, limit, cb){
    fetch(`${SERVER_ADDRESS}comments/${contentid}?page=${page}&limit=${limit}`, {
        method: 'GET'
    })
        .then(response=>{
            if (response.status === 200){
                return response.json();
            }
            return {result: 0};
        })
        .then(rs=>{
            cb(rs);
        }); 
}