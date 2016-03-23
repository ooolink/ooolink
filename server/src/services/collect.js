/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import crypto from 'crypto';
import Collection from '../models/collection';

export const collected = function *() {
    "use strict";
    let user = this._domain.user;
    let {site, type, flag, title, content} = this.request.body.fields;
    let collection_id = crypto.createHmac('sha256', site).update(flag).digest('hex').toString();
    yield Collection.upsert({
        collection_id,
        collection_userId: user.id,
        collection_site: site,
        collection_flag: flag,
        collection_type: type,
        collection_title: title,
        collection_content: content,
        collection_status: 1
    }).then(collection=> {
        this.body = {result: 1, id: collection_id}
    }, error=> {
        console.error('Error    ' + error);
        this.status = 500;
        this.body = {result: 0}
    })
};

export const unCollected = function *() {
    "use strict";
    let user = this._domain.user;
    let id = this.request.body.fields.id;
    yield Collection.update({collection_status: 0}, {where: {collection_id: id, collection_userId: user.id}})
        .then(rs=> {
            if (rs) {
                this.body = {result: 1}
            } else {
                console.error('Error    ' + 0);
                this.status = 500;
                this.body = {result: 0}
            }
        }, error=> {
            console.error('Error    ' + error);
            this.status = 500;
            this.body = {result: 0}
        });
};

export const judgeCollected = function *() {
    "use strict";
    let user = this._domain.user, id = this.request.body.fields.id;
    let collection = yield Collection.findOne({
        where: {
            collection_id: id,
            collection_userId: user.id,
            collection_status: 1
        }
    });
    this.body = {
        result: +(collection ? true : false)
    }
};

export const getCollections = function *() {
    "use strict";
    let user = this._domain.user;
    let collections = yield Collection.findAll({
        where: {
            collection_status: 1,
            collection_userId: user.id
        }
    });
    console.log(collections);
    if (collections) {
        this.body = {
            result: 1,
            collections: collections
        }
    } else {
        console.error('Error    ' + 0);
        this.status = 500;
        this.body = {result: 0}
    }
};