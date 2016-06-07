/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";
import crypto from 'crypto';
import co from 'co';
import User from '../models/user';
import UserInfo from '../models/userInfo';
const consumer = require('fibms-node-client').Consumer();
const producer = require('fibms-node-client').Producer();

export const addUser = function *(name, password, salt, token, site_id = '', site_user_belong = null) {
    "use strict";
    let user = yield User.create({
        user_name: name,
        user_password: password,
        user_salt: salt,
        user_token: token,
        site_id,
        site_user_belong
    });
    return user;
};

export const updateLoginInfo = function *(name, password, salt, token, now_p) {
    "use strict";
    let user = yield User.update(
        {
            user_salt: salt, 
            user_token: token, 
            user_password: now_p,
            user_authtime: Date.now()
        }, {
        where: {
            user_name: name,
            user_password: password
        }
    });
    
    return user;
};

export const getSaltByName = function *(name) {
    "use strict";
    let user = yield User.findOne({where: {user_name: name}});
    return user ? user.user_salt : '';
};

export const findUserByToken = function *(token){
    let user = yield User.findOne({where: {user_token: token}});
    return user;
}

export const findUserById = function *(ids){
    if (Array.isArray(ids)){
        let users = yield User.findAll({
            where: {
                id: {
                    $in: ids
                }
            }
        });
        return users;
    } else {
        let user = yield User.findById(ids);
        return user;
    }
}

export const createUserInfo = function *(user_id, user_realname){
    let userInfo = yield UserInfo.create({
        user_realname,
        user_id
    });
    return userInfo;
}

export const getUserInfo = function *(user_id){
    if (Array.isArray(user_id)){
        let userInfos = yield UserInfo.findAll({
            where:{
                user_id: {
                    $in: user_id
                }
            }
        });
        return userInfos;
    }
    let userInfo = yield UserInfo.findOne({where: {user_id}});
    return userInfo;
}

export const updateUserInfo = function *(value, where){
    let userInfo = yield UserInfo.update(value, where);
    return userInfo;
}

export const checkExtToken = function *(site, token){
    let rs = yield new Promise((resolve, reject)=>{
        let message = producer.createMessage(`ext_user_checkToken_${site}`);
        message.setType(producer.MESSAGE_REQUEST);
        message.setParams('token', token);
        message.addCallBack({
            success: (result)=>{
                resolve(result.result);
            },  
            error: (result)=>{
                reject(result.message);
            }
        })
        producer.sendMessage(message);
    });
    return rs;
}





