/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as types from '../constants/actionTypes'

const initialState = {
    userCollections: null,
    userCollectionsDetail: {}
};

export default function(state = initialState, action) {
    "use strict";

    switch (action.type) {
        case types.UPDATE_USER_COLLECTIONS_GENERAL:
            return Object.assign({}, state, {
                userCollections: action.collections
            });
        case types.UPDATE_USER_COLLECTIONS_DETAIL:
            state.userCollectionsDetail[action.typeId] = {
                count: action.count,
                idx: 0,                                         //用于之后的分页获取操作
                collections: action.collections
            }
        default:
            return state;
    }
}