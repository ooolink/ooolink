/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import Storage from 'react-native-storage'
import { createStore, applyMiddleware } from 'redux'

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState)
}

let storage = new Storage({
    size: 6666,
    defaultExpires: 1000*3600*24*30*6,
    enableCache: true,
    sync: {
        appVersion(params){
            let { resolve, reject } = params;
            resolve('0.0.1');
        },
        isLogin(params){
            let { resolve, reject } = params;
            resolve(false);
        },
        loginBgImage(params){
            let { resolve, reject } = params;
            resolve('https://s-media-cache-ak0.pinimg.com/474x/fb/2e/a5/fb2ea5f431df6765f14632d644ca58b1.jpg');
        }
    }
});

export function getGlobal(key, id, cb) {
    "use strict";
    if (!key || !id){
        return;
    }
    let callback = null;
    let obj = {
        key
    };
    if (typeof id === 'function'){
        callback = id;
    } else if (typeof cb === 'function') {
        callback = cb;
        obj.id = id;
    }
    storage.load(obj).then(ret=>{
        callback && callback(ret);
    }).catch(err=>{
        console.log(`null rs key:${key} id:${id}`);
        if (err){
            console.log(err);
        }
        callback(undefined);
    });
}

export function setGlobal(key, value, expires) {
    "use strict";
    let id;
    if (typeof key === 'object'){
        id = key.id;
        key = key.key;
    }
    let obj = {key, rawData: value};
    id && (obj.id = id);
    expires && (obj.expires = expires);
    storage.save(obj);
}




