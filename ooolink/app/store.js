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
import { createStore, applyMiddleware } from 'redux'

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

export default function configureStore(initialState) {
    return createStoreWithMiddleware(rootReducer, initialState)
}

let global = {
    appVersion: '0.0.1',
    oooLinkToken: 'a27778cc4a545ac318a840d858b21cadafa8a4ea4ef59a13b08afbd1fe8a3478',
    userName: 'rube'
};

export function getGlobal(key) {
    "use strict";
    if (key) {
        return global[key];
    }
    return global;
}

export function setGlobal(key, value) {
    "use strict";
    global[key] = value;
}