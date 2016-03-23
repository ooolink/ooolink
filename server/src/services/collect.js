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
    yield Collection.create({
        collection_id,
        collection_userId: user.id,
        collection_site: site,
        collection_flag: flag,
        collection_type: type,
        collection_title: title,
        collection_content: content
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
    yield Collection.destroy({where: {collection_id: id, collection_userId: user.id}})
        .then(rs=> {
            this.body = {result: 1}
        }, error=> {
            console.error('Error    ' + error);
            this.status = 500;
            this.body = {result: 0}
        });
};

export const judgeCollected = function *() {
    "use strict";
    let user = this._domain.user;
};

export const getCollections = function *() {
    "use strict";

};