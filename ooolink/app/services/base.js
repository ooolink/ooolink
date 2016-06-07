/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as loginService from './loginService';
import {updateUserToken, updateUserLoginStatus} from '../actions/user';
import {getGlobal, setGlobal} from '../store';

export function responseAuth(reAuthCb, cb){
    return (response)=>{
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401){
                loginService.reAuth(rs=>{
                    if (rs && rs.result === 401){
                        setGlobal('isLogin', false);
                        updateUserLoginStatus(false);                   //更新 redux
                        return {result: 401};
                    } else if (rs && rs.result === 1){
                        setGlobal('isLogin', true);
                        updateUserToken(rs.data);                       //更新 redux
                        reAuthCb(rs.data);
                    } else {
                        return {result: 0};
                    }
                });
            } else {
                return {result: 0};
            }
    }
}