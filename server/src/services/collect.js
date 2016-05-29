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
import SiteFocus from '../models/focus';
import Focus from '../models/focus';
import Sites from '../models/sites';

export const changeCollectionContentStatus = function *(collection_id, collection_userId, collection_type, collection_status) {
    "use strict";
    let collection = yield Collection.upsert({
        collection_id,
        collection_userId,
        collection_status,
        collection_type
    });
    return collection;
};

export const getCollectionContentStatus = function *(collection_userId, collection_id) {
    "use strict";
    let collection = yield Collection.findOne({
        attributes: ['collection_status'],
        where: {
            collection_userId,
            collection_id
        }
    });
    if (collection && collection.collection_status){
        return 1;
    } else {
        return 0;
    }
};

export const getCollections = function *(collection_userId, page=0, limit=10, fields) {
    "use strict";
};

export const getCollectionsGeneralByType = function *(collection_userId, collection_type, limit){
    let collections = yield Collection.findAndCountAll({
        attributes: ['collection_id'], 
        where: {
            collection_userId, 
            collection_type
        },
        limit
    });
    return collections;
}

export const getCollectionsDetailByType = function *(collection_userId, collection_type){
    let collections = yield Collection.findAll({
        attributes: ['collection_id'],
        where: {
            collection_userId,
            collection_type
        }
    });
    return collections;
}

/** site **/

export const changeFocusSiteStatus = function *(focus_id, focus_userId, status) {
    "use strict";
    let focus = yield Focus.upsert({
        focus_id,
        focus_type: 'site',
        focus_userId,
        focus_status: status
    });
    return focus;
};

export const getFocusSiteStatus = function *(focus_id, focus_userId){
    let focus = yield Focus.findOne({
        attributes: ['focus_status'],
        where: {
            focus_id,
            focus_userId
        }
    });
    if (focus && focus.focus_status) {
        return 1;
    } else {
        return 0;
    }
};

export const getSitefocused = function *(focus_userId, page=0, limit=10) {
    "use strict";
    let focuses = yield Focus.findAll();
};