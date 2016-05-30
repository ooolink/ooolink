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
        data: JSON.parse(d)
    }
}

export const getUserCollectionsGeneral = function *(next){
    let userId = this._domain.user.id;
    let types = JSON.parse(this._domain.user.user_collection_type);

    let contentMap = {};
    for (let i = 0,len = types.length; i < len; i++){
        let collections = yield collectService.getCollectionsGeneralByType(userId, types[i].id, 3);
        contentMap[types[i].name] = {count: collections.count, id: types[i].id};
        let ids = [];
        collections.rows.forEach(row=>{
            ids.push(row.collection_id);
        });
        contentMap[types[i].name]['rows'] = ids.length ? yield contentService.getContentByIds(ids, {title: 1}) : [];
    }

    this.body = {
        result: 1,
        data: contentMap
    }
}

export const getUserCollectionsDetail = function *(next){
    let userId = this._domain.user.id;
    let type = this.query.type;
    let types = JSON.parse(this._domain.user.user_collection_type);

    if (typeIdIsExists(types, type) !== -1){       
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
    let types = JSON.parse(user.user_collection_type);

    if (typeNameIsExists(types, type) === -1){
        let id = crypto.createHash('md5').update(type + new Date()).digest('hex').toString();
        types.push({name: type, id});
        user.user_collection_type = JSON.stringify(types);
        yield user.save();
        this.body = {
            result: 1,
            data: id
        };
    } else {
        throw new Error('collectiontypeCreate operateError 500');
    }
}

export const deleteUserCollectionType = function *(next){
    let type = this.request.body.fields.type;
    let types = JSON.parse(this._domain.user.user_collection_type);
    let idx = typeIdIsExists(types, type);
    if (idx === -1){
        throw new Error('deleteUserCollectionType paramsError 500');
    }
    
    types.splice(idx, 1);
    this._domain.user.user_collection_type = JSON.stringify(types);
    yield collectService.changeCollectionContentStatusByType(this._domain.user.id, type, 0);
    yield this._domain.user.save();
    this.body = {
        result: 1
    }
}

export const updateUserCollectionType = function *(next){
    let {otype, ntype} = this.request.body.fields;
    let types = JSON.parse(this._domain.user.user_collection_type),
    idx = typeNameIsExists(types, otype);
    if (idx === -1){
        throw new Error('updateUserCollectionType paramsError 500');
    }
    types.splice(idx, 1, {name: ntype, id: types[idx].id});
    this._domain.user.user_collection_type = JSON.stringify(types);
    yield this._domain.user.save();
    this.body = {
        result: 1
    }    
}

function typeIdIsExists(types, typeId){
    for (let i = 0, len = types.length; i < len; i++){
        if (types[i].id === typeId){
            return i;
        }
    }
    return -1;
}

function typeNameIsExists(types, typeName){
    for (let i =0, len = types.length; i < len; i++){
        if (types[i].name === typeName){
            return i;
        }
    }
    return -1;
}




