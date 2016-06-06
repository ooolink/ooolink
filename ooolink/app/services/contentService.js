/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import {SERVER_ADDRESS} from '../constants/config';
import {getGlobal, setGlobal} from '../store';
import {timeDeal, UriDeal} from '../utils';

export function getWelcomeContent(cb){
    "use strict";
    fetch(`${SERVER_ADDRESS}recommend/welcome?time=${Date.now()}`)
        .then(response=> {
            if (response.status === 200) {
                return response.json();
            } else {
                return null;                            
            }
        })
        .then(rs=> {
            if (!rs || rs.result!=1){
                return cb(null);             //TODO 容错处理
            }
            rs = rs.data;
            let saveData = {
                id: rs.content_id,
                title: rs.title,
                time: '更新于' + timeDeal(rs.updated),
                readtime: '读完大约需要' + timeDeal(rs.quantity.view_avetime_general, 'read'),
                image: UriDeal(rs.image)
            };
            setGlobal('welcomeContent', saveData, 1000*3600*6);
            cb && cb(saveData);
        });
}

export function getSeaGlobalContents(page, cb){
    fetch(`${SERVER_ADDRESS}recommend/seaglobal?page=${page}`)
        .then(response=>{
            if (response.status === 200){
                return response.json();
            } else {
                return null;
            }
        })
        .then(rs=>{
            cb(rs);
        });
}

export function getArtificialRecommend(cb){
    fetch(`${SERVER_ADDRESS}recommend/artificial?limit=5&type=content`)
    .then(response=>{
        if (response.status === 200){
            return response.json();
        } else {
            return null;
        }
    })
    .then(rs=>{
        cb(rs);
    })
}

export function getHotContents(page, cb){
    fetch(`${SERVER_ADDRESS}recommend/hot`)
    .then(response=>{
        if (response.status === 200){
            return response.json();
        } else {
            return null; 
        }
    })
    .then(rs=>{
        cb(rs);
    })
}

export function getContentsByType(page, limit, type, cb){
    fetch(`${SERVER_ADDRESS}contents?page=${page}&limit=${limit}&type=${type}`)
    .then(response=>{
        if (response.status === 200){
            return response.json();
        } else {
            return null;
        }
    })
    .then(rs=>{
        cb(rs);
    });

}



















