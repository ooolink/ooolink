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
    topics: {},
    loadingTopicsIdNow: null,
    getTopicsLoading: false,
    loadingTopicIdNow: null,
    getTopicLoading: false,
    content: {},
    welcomeContent: null
};

export default function(state = initialState, action) {

    switch (action.type) {
        case types.SET_WELCOME_CONTENT:
            return Object.assign({}, state, {
                welcomeContent: action.content
            });

        case types.GET_TOPICS:
            let {page, topics, site} = action;
            if (page === 0){
                state.topics[site] = topics;
            } else {
                state.topics[site] = [...state.topics[site], ...topics];
            }
            return Object.assign({}, state);

        case types.SET_CONTENT:
            let {content, contentid} = action;
            state.content[contentid] = content;
            return Object.assign({}, state);
        default:
            return state;
    }
}