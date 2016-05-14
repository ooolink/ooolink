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

import * as userService from '../services/user';

export const auth = function *(next){
	let {token} = this.request.body.fields;
    let user = yield userService.findUserByToken(token);
    if (user && Date.now() - user.user_authtime < 600000) {
        this._domain = this._domain || {};
        this._domain.user = user;
        yield next;
    } else {
        throw new Error('userauth authError 401');
    }
}

export const sign = function *(next){
    let {password, name} = this.request.body.fields;
    if (!(/^[0-9a-z]+$/).exec(name) || !(/^[0-9a-z]+$/).exec(password)
        || name.length < 6 || password.length < 6) {
        throw new Error('sign paramsError 500');     
    }
    let salt = crypto.createHash('md5').update(name + new Date()).digest('hex').toString(),
        token = crypto.createHmac('sha256', salt).update(password + new Date()).digest('hex').toString(),
        u_password = crypto.createHmac('sha256', salt).update(password).digest('hex').toString();
    let user = yield userService.addUser(name, u_password, salt, token);
    if (user.user_token){
        this.body = {
            result: 1,
            data: user.user_token
        };
    } else {
        throw new Error('sign operateError 500');
    }
}

export const login = function *(next){
    let {password, name} = this.request.body.fields;
    if (!(/^[0-9a-z]+$/).exec(name) || !(/^[0-9a-z]+$/).exec(password)
        || name.length < 6 || password.length < 6) {
        throw new Error('login paramsError 500');     
    }
    let _salt = this.request.body.fields.token,
        _password = crypto.createHmac('sha256', _salt).update(password).digest('hex').toString(),
        salt = crypto.createHash('md5').update(name + new Date()).digest('hex').toString(),
        token = crypto.createHmac('sha256', salt).update(password + new Date()).digest('hex').toString(),
        now_password = crypto.createHmac('sha256', salt).update(password).digest('hex').toString();

    let user = yield userService.updateLoginInfo(name, _password, salt, token, now_password);
    if (user[0]){
        this.body = {
            result: 1,
            data: token
        }
    } else {
        throw new Error('login operateError 500');
    }
}

export const session = function *(next){
    let {name} = this.request.body.fields;
    if (!(/^[0-9a-z]+$/).exec(name) || name.length < 6 ) {
        throw new Error('session paramsError 500');     
    }
    let salt = yield userService.getSaltByName(name);
    if (salt){
        this.body = {
            result: 1,
            data: salt
        }
    } else {
        throw new Error('session rsNullError 500');
    }
}





