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
import * as collectService from '../services/collect';
import * as contentService from '../services/content';
import * as siteService from '../services/site';

export const auth = function *(next){
	let token = this.header['x-access-token'];
    let user = yield userService.findUserByToken(token);
    if (user && Date.now() - user.user_authtime < 1000600000) {
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

export const getUserCollectionTypes = function *(next){
    let d = this._domain.user.user_collection_type;
    this.body = {
        result: 1,
        data: d ? d.split(',') : []
    }
}

export const getUserCollectionsGeneral = function *(next){
    let userId = this._domain.user.id;
    let types = this._domain.user.user_collection_type.split(',');
        types.push('default');          //默认的收藏

    let contentMap = {};
    for (let i = 0,len = types.length; i < len; i++){
        let collections = yield collectService.getCollectionsGeneralByType(userId, types[i], 3);
        contentMap[types[i]] = {count: collections.count};
        let ids = [];
        collections.rows.forEach(row=>{
            ids.push(row.collection_id);
        });
        contentMap[types[i]]['rows'] = ids.length ? yield contentService.getContentByIds(ids, {title: 1}) : [];
    }

    this.body = {
        result: 1,
        data: contentMap
    }
}

export const getUserCollectionsDetail = function *(next){
    let userId = this._domain.user.id;
    let type = this.query.type;
    if (type === 'default' || this._domain.user.user_collection_type.includes(type)){       //包括默认收藏
        let collections = yield collectService.getCollectionsDetailByType(userId, type);
        let ids = [];
        collections.forEach(row=>{
            ids.push(row.collection_id);
        });
        this.body = {
            result: 1,
            data: ids.length ? yield contentService.getContentByIds(ids, {content: 0}) : []
        }
    } else {
        throw new Error('getUserCollectionsDetail paramsError 500');
    }
}

export const getUserFocus = function *(next){
    let {page, limit} = this.query;
    let focuses = yield collectService.getSitefocused(this._domain.user.id);
    let ids = [];
    focuses.forEach(f=>{
        ids.push(f.focus_id);
    });
    this.body = {
        result: 1,
        data: ids.length ? yield siteService.getSiteInfo(ids) : []
    }
}

export const createUserCollectionType = function *(next){
    let type = this.request.body.fields.type;
    let user = this._domain.user;
    let types = user.user_collection_type.split(',');
    if (types.indexOf(type) === -1){
        user.user_collection_type = user.user_collection_type ? user.user_collection_type + `,${type}` : type;
        yield user.save();
        this.body = {
            result: 1
        };
    } else {
        throw new Error('collectiontypeCreate operateError 500');
    }
}

export const deleteUserCollectionType = function *(next){
    let type = this.query.type;
    let types = this._domain.user.user_collection_type.split(','),
        idx = types.indexOf(type);
    if (idx === -1){
        throw new Error('deleteUserCollectionType paramsError 500');
    }
    types.splice(idx, 1);
    this._domain.user.user_collection_type = types.join(',');
    yield this._domain.user.save();
    this.body = {
        result: 1
    }
}

export const updateUserCollectionType = function *(next){
    let {otype, ntype} = this.query;
    let types = this._domain.user.user_collection_type.split(','),
    idx = types.indexOf(otype);
    if (idx === -1){
        throw new Error('updateUserCollectionType paramsError 500');
    }
    types.splice(idx, 1, ntype);
    this._domain.user.user_collection_type = types.join(',');
    yield this._domain.user.save();
    this.body = {
        result: 1
    }    
}





