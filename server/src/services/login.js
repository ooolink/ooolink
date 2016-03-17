/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import crypto from 'crypto';
import co from 'co';
import User from '../models/user';

export const sign = function *() {
    "use strict";
    let {password,name} = this.request.body.fields;
    let salt = crypto.createHash('md5').update(name + new Date()).digest('hex').toString(),
        token = crypto.createHmac('sha256', salt).update(password + new Date()).digest('hex').toString();
    yield User.create({
        user_name: name,
        user_password: crypto.createHmac('sha256', salt).update(password).digest('hex').toString(),
        user_salt: salt,
        user_token: token
    }).then((user)=> {
        this.body = {result: 1, token};
    }, (err)=> {
        console.error('Error:   ' + err);
        this.status = 500;
        this.body = {result: 0};
    });
};

export const login = function *() {
    "use strict";
    let {password, name} = this.request.body.fields;
    let _salt = this.request.body.fields.token,
        _password = crypto.createHmac('sha256', _salt).update(password).digest('hex').toString(),
        salt = crypto.createHash('md5').update(name + new Date()).digest('hex').toString(),
        token = crypto.createHmac('sha256', salt).update(password + new Date()).digest('hex').toString(),
        now_p = crypto.createHmac('sha256', salt).update(password).digest('hex').toString();

    yield User.update({user_salt: salt, user_token: token, user_password: now_p}, {
            where: {
                user_name: name,
                user_password: _password
            }
        })
        .then((r)=> {
            if (r[0]) {
                this.body = {
                    result: 1,
                    token
                }
            } else {
                console.error('Error:   0');
                this.status = 500;
                this.body = {result: 0}
            }
        }, (err)=> {
            console.error('Error:   ' + err);
            this.status = 500;
            this.body = {result: 0}
        })
};

export const session = function *() {
    "use strict";
    let {name} = this.request.body.fields;
    yield User.findOne({where: {user_name: name}})
        .then(user=> {
            this.body = {result: 1, token: user.user_salt};
        }, error=> {
            console.error('Error:   ' + error);
            this.status = 500;
            this.body = {result: 0}
        })
};

export const auth = function *(next) {
    "use strict";
    let {token} = this.query;
    yield User.findOne({where: {user_token: token}})
        .then(user=> {
            if (user) {
                this._domain = this._domain || {};
                this._domain.user = user;
                co(function *() {
                    yield next;
                });
            } else {
                console.error('Error:   0');
                this.status = 500;
                this.body = {result: 0}
            }
        });
};