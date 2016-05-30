/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as types from '../constants/actionTypes'

const initialState = {
    userIsLogon: null,                     //null 表示未知, false 表示未登陆, true 表示已经登录
    userInfo: null,                        //用户信息 JSON 格式
    userToken: null,                       //用于验证的 token
    userName: null,
    userPasswd: null
};

export default function(state = initialState, action) {

    switch (action.type) {
        case types.UPDATE_USER_LOGIN_STATUS:
            state.userIsLogon = action.status;
            break;
        case types.UPDATE_USER_INFO: 
            state.userInfo = action.info;
            break;
        case types.UPDATE_USER_TOKEN:
            state.userToken = action.token;
            break;
        case types.UPDATE_USER_LOGIN_INFO:
            state.userName = action.userName;
            state.userPasswd = action.userPasswd;
            if (action.token){
                state.userToken = token;
            }
    }

    return Object.assign({}, state);
}