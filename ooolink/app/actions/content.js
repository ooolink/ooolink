/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as collectService from '../services/collectService';
import * as ActionTypes from '../constants/actionTypes';
import {SERVER_ADDRESS} from '../constants/config';
import {setGlobal, getGlobal} from '../store';

function getTopicsFromServer(site, theme, page, limit) {
    "use strict";
    return dispatch => {
        let saveId = `${site}-${theme}-${page}-${limit}`;
        saveId = saveId.replace(/\_/g, '*');
        getGlobal('topics', saveId, (ret)=>{
            if (ret){
                dispatch({
                    type: ActionTypes.GET_TOPICS,
                    topics: ret,
                    page,
                    loadingTopicsIdNow: `${site}-${theme}-${page}-${limit}`
                });
            } else {
                fetch(`${SERVER_ADDRESS}site/theme?site=${site}&theme=${theme}&limit=${limit}&page=${page}`)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                    let topics = json.data;
                    setGlobal({
                        key: 'topics',                                                      //TODO 获取错误处理
                        id: saveId
                    }, topics, 1000*60);
                    dispatch({
                        type: ActionTypes.GET_TOPICS,
                        topics,
                        page,
                        loadingTopicsIdNow: `${site}-${theme}-${page}-${limit}`
                    });
                });
            }
        });
    }
}

function getTopicFromServer(site, id) {
    "use strict";
    return dispatch => {
        let saveId = id.replace(/\_/g, '*');
        getGlobal('topicDetail', saveId, (ret)=>{
            if (ret){
                dispatch({
                    type: ActionTypes.GET_TOPIC,
                    topic: ret,
                    loadingTopicIdNow: id
                })
            } else {
                fetch(`${SERVER_ADDRESS}site/topic/${id}?site=${site}`)
                .then(response => response.json())
                .then(json => {
                    let topic = json.data;
                    setGlobal({
                        key: 'topicDetail',
                        id: saveId
                    }, topic, 1000 * 3600);
                    dispatch({
                        type: ActionTypes.GET_TOPIC,
                        topic,
                        loadingTopicIdNow: id
                    });
                });
            }
        });
    }
}

export function getTopics(site, theme, page = 0, limit = 20) {
    "use strict";
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.GET_TOPICS_LOADING,
            loadingTopicsIdNow: `${site}-${theme}-${page}-${limit}`
        });
        return dispatch(getTopicsFromServer(site, theme, page, limit));
    }
}

export function getTopic(id) {
    "use strict";
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.GET_TOPIC_LOADING,
            loadingTopicIdNow: id
        });
        return dispatch(getTopicFromServer(id.split('_')[0], id));                              //content_id = site_id + '_' + flag
    }
}

export function collectTopic(id, site, sitename, topicId, title, created) {
    "use strict";
    return {
        type: ActionTypes.ADD_COLLECTION,
        id,
        site,
        sitename,
        title,
        created,
        topicId
    }
}

export function unCollectionTopic(id, site, topicId) {
    "use strict";
    return {
        type: ActionTypes.RM_COLLECTION,
        id,
        site,
        topicId
    }
}

function getCollectionsFromServer(token) {
    "use strict";
    return (dispatch)=> {
        collectService.getCollections(token, (rs)=> {
            dispatch({
                type: ActionTypes.GET_COLLECTIONS,
                collections: rs.collections
            })
        })
    }
}

export function getCollections(token) {
    "use strict";
    return (dispatch, getState)=> {
        return dispatch(getCollectionsFromServer(token));
    }
}