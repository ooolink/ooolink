/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as ActionTypes from '../constants/actionTypes';
import {getGlobal, setGlobal} from '../store';

export function getUserAllInfoFromNativeCache(){
    return (dispatch, getState)=>{
        getGlobal('isLogin', status=>{
                dispatch({
                    type: ActionTypes.UPDATE_USER_LOGIN_STATUS,
                    status: !!status
                });

                getGlobal('oooLinkToken', token=>{
                    dispatch({
                        type: ActionTypes.UPDATE_USER_TOKEN, 
                        token: token || null
                    });

                    getGlobal('userInfo', info=>{
                        dispatch({
                            type: ActionTypes.UPDATE_USER_INFO,
                            info: info || null
                        });

                        getGlobal('userName', userName=>{
                            getGlobal('passWord', userPasswd=>{
                                dispatch({
                                    type: ActionTypes.UPDATE_USER_LOGIN_INFO,
                                    userName: userName || null,
                                    userPasswd: userPasswd || null
                                });

                                //App加载完成，如果还有其他预加载流程可以放到对应流程中
                                dispatch({
                                    type: ActionTypes.UPDATE_APP_LOAD_STATUS,
                                    status: true
                                });
                            });
                        });
                    });
                });                
        });
    }
}

export function setUserInfoAfterLoginStatusChange(userName, userPasswd, token, status, info){
    return (dispatch, getState)=>{
        dispatch({
            type: ActionTypes.UPDATE_USER_TOKEN,
            token
        });

        dispatch({
            type: ActionTypes.UPDATE_USER_LOGIN_STATUS,
            status
        });

        dispatch({
            type: ActionTypes.UPDATE_USER_LOGIN_INFO,
            userName,
            userPasswd
        });

        if (info || info === 'infoClear'){
            dispatch({
                type: ActionTypes.UPDATE_USER_INFO,
                info: info === 'infoClear' ? null : info
            });
        }
    }
}

export function updateUserToken(token){
    if (token){
        return {
            type: ActionTypes.UPDATE_USER_TOKEN,
            token
        }
    } else {
        return (dispatch, getState)=>{
            getGlobal('oooLinkToken', token=>{
                dispatch({
                    type: ActionTypes.UPDATE_USER_TOKEN,
                    token
                });
            });
        }
    }
}

export function updateUserInfo(info){
    if (info){
        return {
            type: ActionTypes.UPDATE_USER_INFO,
            info
        }
    } else {
        return (dispatch, getState)=>{
            getGlobal('userInfo', info=>{
                dispatch({
                    type: ActionTypes.UPDATE_USER_INFO,
                    info
                });
            });
        }
    }
}







