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
    comments: {},
    commentCount: {}
};

export default function(state = initialState, action) {
    "use strict";

    switch (action.type) {
        case types.POST_COMMENT:
            if (!state.comments[action.contentid]){
                state.comments[action.contentid] = [];
            }
            state.comments[action.contentid].push(action.comment);            //comment由上层组合，数据格式和后端的一样
            return Object.assign({}, state);

        case types.SET_COMMENTS:
            if (action.page === 0){
                state.comments[action.contentid] = action.comments;
            } else {
                state.comments[action.contentid] = state.comments[action.contentid].concat(action.comments);
            }
            return Object.assign({}, state);
        case types.UPDATE_COMMENT_COUNT:
            if (state.commentCount[action.contentid]){
                state.commentCount[action.contentid] += action.incNumber;
            } else {
                state.commentCount[action.contentid] = action.incNumber;
            }
            return Object.assign({}, state);
        default:
            return state;
    }
}