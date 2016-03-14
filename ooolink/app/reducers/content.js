/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as types from '../constants/actionTypes'

//0 view, 1 person, 2 setting
const initialState = {
    topics: {},
    comments: {},
    topicSelected: null
};

export default function(state = initialState, action) {

    switch (action.type) {
        case types.GET_TOPICS:
            let {theme,page,topics} = action;
            state.topics[theme] = state.topics[theme] || {};
            state.topics[theme][page] = topics;
            return Object.assign({}, state);
        case types.GET_TOPIC:
            let {id, topic} = action;
            state.comments[id] = topic;
            state.topicSelected = id;
            return Object.assign({}, state);
        default:
            return state;
    }
}