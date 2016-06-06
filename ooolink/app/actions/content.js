/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as collectService from '../services/collectService';
import * as contentService from '../services/contentService'
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
                    site,
                    page
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
                        site,
                        topics,
                        page
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
                    type: ActionTypes.SET_CONTENT,
                    content: ret,
                    contentid: id
                })
            } else {
                fetch(`${SERVER_ADDRESS}site/topic/${id}?site=${site}`)
                .then(response => response.json())
                .then(json => {
                    let content = json.data;
                    setGlobal({
                        key: 'topicDetail',
                        id: saveId
                    }, content, 1000 * 60);
                    dispatch({
                        type: ActionTypes.SET_CONTENT,
                        content,
                        contentid: id
                    });
                });
            }
        });
    }
}

export function getTopics(site, theme, page = 0, limit = 20) {
    "use strict";
    return (dispatch, getState) => {
        return dispatch(getTopicsFromServer(site, theme, page, limit));
    }
}

export function getTopic(id) {
    "use strict";
    return (dispatch, getState) => {
        return dispatch(getTopicFromServer(id.split('_')[0], id));                              //content_id = site_id + '_' + flag
    }
}

export function getContentAllInfoFromNativeCache(cb){
    return (dispatch, getState)=>{
        getGlobal('welcomeContent', content=>{
            if (content){
                dispatch({
                    type: ActionTypes.SET_WELCOME_CONTENT,
                    content
                });
                cb && cb();
            } else {
                contentService.getWelcomeContent(content=>{
                    if (content){
                        dispatch({
                            type: ActionTypes.SET_WELCOME_CONTENT,
                            content
                        });
                    } else {
                        console.log('没有获取到 welcomeContent 数据');
                    }
                    cb && cb();
                });
            }
        });
    }
}

