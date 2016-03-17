/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import User from '../models/user';
import crypto from 'crypto';

export const sign = function *() {
    "use strict";
    let {password,name} = this.request.body.fields;
    let salt = crypto.createHash('md5').update(name + new Date()).digest('hex').toString();
    yield User.create({
        user_name: name,
        user_password: crypto.createHmac('sha256', salt).update(password).digest('hex').toString(),
        user_salt: salt,
        user_token: crypto.createHmac('sha256', salt).update(password + new Date()).digest('hex').toString()
    }).then((user)=> {
        this.body = {result: 1};
    }, (err)=> {
        console.error('Error:   ' + err);
        this.status = 500;
        this.body = {result: 0};
    });
};