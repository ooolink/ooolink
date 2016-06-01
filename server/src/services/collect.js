/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const consumer = require('fibms-node-client').Consumer();
const producer = require('fibms-node-client').Producer();
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

export const changeCollectionContentStatusByType = function *(collection_userId, collection_type, collection_status){
    let collections = yield Collection.update({
        collection_status
    }, {
        where:{
            collection_userId,
            collection_type
        }
    });
    return collections;
}

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
            collection_type,
            collection_status: 1
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
            collection_type,
            collection_status: 1
        }
    });
    return collections;
}

/** site **/

export const changeFocusSiteStatus = function *(focus_id, focus_userId, status) {
    "use strict";
    if (!Array.isArray(focus_id)){
        let focus = yield Focus.upsert({
            focus_id,
            focus_type: 'site',
            focus_userId,
            focus_status: status
        });
        return focus;
    } else {
        let focus = yield Focus.update({
            focus_status: status
        }, {
            where: {
                focus_id: {
                    in: focus_id
                },
                focus_userId,
                focus_type: 'site'
            }
        });
        return focus;
    }
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
    let focuses = yield Focus.findAll({
        attributes: ['focus_id'],
        where: {
            focus_type: 'site',
            focus_userId,
            focus_status: 1
        },
        limit: 10,
        offset: page * limit
    });
    return focuses;
};

/** 远程调用 **/
export const incContentCollectionNumber = function (contentid){
    let message = producer.createMessage('global_content_incCollectionNumber');
    message.setType(producer.MESSAGE_GROUP);
    message.setParams('contentid', contentid);
    producer.sendMessage(message);
    return true;
}

export const decContentCollectionNumber = function (contentid){
    let message = producer.createMessage('global_content_decCollectionNumber');
    message.setType(producer.MESSAGE_GROUP);
    message.setParams('contentid', contentid);
    producer.sendMessage(message);
    return true;
}


