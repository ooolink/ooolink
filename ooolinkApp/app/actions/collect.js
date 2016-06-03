/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as ActionTypes from '../constants/actionTypes';

export function updateUserCollectionGeneral(collections){
    return {
        type: ActionTypes.UPDATE_USER_COLLECTIONS_GENERAL,
        collections
    }
}

export function updateUserCollectionDetail(typeId, count, collections){
    return {
        type: ActionTypes.UPDATE_USER_COLLECTIONS_DETAIL,
        typeId,
        count,
        collections
    }
}