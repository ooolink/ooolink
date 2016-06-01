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

        case types.GET_TOPICS_LOADING:
            state.getTopicsLoading = true;
            state.topics = {};
            state.loadingTopicsIdNow = action.loadingTopicsIdNow;
            return Object.assign({}, state);

        case types.GET_TOPICS:
            let {page, topics, loadingTopicsIdNow} = action;
            if (loadingTopicsIdNow !== state.loadingTopicsIdNow){
                return Object.assign({}, state);
            }
            state.topics = state.topics || {};
            state.topics[page] = topics;
            state.getTopicsLoading = false;
            return Object.assign({}, state);

        case types.SET_CONTENT:
            let {content, contentid} = action;
            state.content[contentid] = content;
            return Object.assign({}, state);
        default:
            return state;
    }
}