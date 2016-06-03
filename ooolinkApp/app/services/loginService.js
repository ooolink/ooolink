/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import {SERVER_ADDRESS} from '../constants/config';
import {getGlobal, setGlobal, removeGlobal} from '../store'

export function reAuth(cb){
    getGlobal('userName', (name)=>{
        if (!name){
            return cb({result: 401});
        }
        getGlobal('passWord', (pwd)=>{
            if (!pwd){
                return cb({result: 401});
            }
            session(name, (rs)=>{
                if (rs && rs.result === 1){
                    login(name, pwd, rs.data, (r)=>{
                        if (r && r.result === 1){
                            setGlobal('oooLinkToken', r.data);
                            cb(r)
                        } else {
                            cb({result: 401});
                        }
                    });
                } else {
                    cb({result: 401});
                }
            });
        });
    });
}

export function session(name, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}user/session`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `name=${name}`
    })
        .then(response=>response.json())
        .then(rs=> {
            cb(rs);
        })
}

export function login(name, pwd, token, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `name=${name}&password=${pwd}&token=${token}`
    })
        .then(response=>response.json())
        .then(rs=> {
            if (rs.result === 1){
                setGlobal('oooLinkToken', rs.data);
                setGlobal('userName', name);
                setGlobal('passWord', pwd);
                setGlobal('isLogin', true);
                cb(rs);
            } else {
                cb(null);
            }
        })
}

export function sign(name, pwd, cb) {
    "use strict";

    fetch(`${SERVER_ADDRESS}user/sign`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `name=${name}&password=${pwd}`
    })
        .then(response=>response.json())
        .then(rs=> {
            if (rs.result === 1){
                setGlobal('oooLinkToken', rs.data);
                setGlobal('userName', name);
                setGlobal('passWord', pwd);
                setGlobal('isLogin', true);
                cb(rs);
            } else {
                cb(null);
            }
        })
}

export function loginOut(){
    removeGlobal('oooLinkToken');
    removeGlobal('userName');
    removeGlobal('passWord');
    setGlobal('isLogin', false);
}

