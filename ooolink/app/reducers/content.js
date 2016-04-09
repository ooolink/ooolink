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
    topicSelected: null,
    collections: []
};

export default function(state = initialState, action) {

    switch (action.type) {
        case types.CLEAR_CONTENT:
            return {
                topics: {},
                comments: {},
                topicSelected: null,
                collections: []
            };
        case types.GET_TOPICS:
            let {theme,page,topics} = action;
            state.topics[theme] = state.topics[theme] || {};
            state.topics[theme][page] = topics;
            return Object.assign({}, state);
        case types.GET_TOPIC:
            let {id, topic} = action;
            state.comments[id] = topic;
            return Object.assign({}, state);
        case types.GET_COLLECTIONS:
            state.collections = action.collections;
            return Object.assign({}, state);
        case types.ADD_COLLECTION:
            let flag = false;
            state.collections.forEach(collection=>{
                if (collection.collection_id === action.id){
                    flag = true;
                }
            });
            if (!flag){
                state.collections.push({
                    collection_id: action.id,
                    collection_site: action.site,
                    collection_site_name: action.sitename,
                    collection_title: action.title,
                    collection_created: action.created
                });
            }
            return Object.assign({}, state);
        case types.RM_COLLECTION:
            state.collections = state.collections.filter(c=>!(c.collection_id === action.id));
            return Object.assign({}, state);
        default:
            return state;
    }
}