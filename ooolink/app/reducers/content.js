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
    topic: null,
    collections: []
};

export default function(state = initialState, action) {

    switch (action.type) {
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
        
        case types.GET_TOPIC_LOADING:
            state.getTopicLoading = true;
            state.topic = null;
            state.loadingTopicIdNow = action.loadingTopicIdNow;
            return Object.assign({}, state);

        case types.GET_TOPIC:
            let {topic, loadingTopicIdNow} = action;
            if (loadingTopicIdNow !== state.loadingTopicIdNow){
                return Object.assign({}, state);
            }            
            state.topic = topic;
            state.getTopicLoading = false;
            return Object.assign({}, state);
        
        case types.GET_COLLECTIONS:
            state.collections = action.collections;
            return Object.assign({}, state);
        case types.ADD_COLLECTION:
            let flag = false;
            state.collections.forEach((collection, idx)=>{
                if (collection.collection_id === action.id){
                    flag = idx;
                }
            });
            if (flag === false){
                state.collections.push({
                    collection_id: action.id,
                    collection_site: action.site,
                    collection_site_name: action.sitename,
                    collection_title: action.title,
                    collection_created: action.created
                });
            } else {
                state.collections[flag].collection_created = action.created;
            }
            return Object.assign({}, state);
        case types.RM_COLLECTION:
            state.collections = state.collections.filter(c=>!(c.collection_id === action.id));
            return Object.assign({}, state);
        default:
            return state;
    }
}