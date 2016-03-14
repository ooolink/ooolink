/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as ActionTypes from '../constants/actionTypes';
import {SERVER_ADDRESS} from '../constants/config';

function getTopicsFromServer(site, theme, page, limit) {
    "use strict";
    return dispatch => {
        return fetch(`${SERVER_ADDRESS}${site}/theme/${theme}?limit=${limit}&page=${page}`)
            .then(response => response.json())
            .then(json => {
                let topics = json;
                dispatch({
                    type: ActionTypes.GET_TOPICS,
                    topics,
                    theme,
                    page
                });
            });
    }
}

function getTopicFromServer(site, id) {
    "use strict";
    return dispatch => {
        return fetch(`${SERVER_ADDRESS}${site}/topic/${id}`)
            .then(response => response.json())
            .then(json => {
                let topic = json;
                dispatch({
                    type: ActionTypes.GET_TOPIC,
                    topic,
                    id
                });
            });
    }
}

export function getTopics(theme, page = 0, limit = 10) {
    "use strict";
    return (dispatch, getState) => {

        let site = getState().app.currentSite, topics = getState().content.topics[theme];

        if (topics && topics[page]) {
            return dispatch({
                type: ActionTypes.GET_TOPICS,
                topics: topics[page],
                theme,
                page
            })
        }
        return dispatch(getTopicsFromServer(site, theme, page, limit));
    }
}

export function selectTopic(id) {
    "use strict";
    return {
        type: ActionTypes.SELECT_TOPIC,
        id
    }
}

export function getTopic(id) {
    "use strict";
    return (dispatch, getState) => {

        let site = getState().app.currentSite;
        dispatch(selectTopic(id));
        return dispatch(getTopicFromServer(site, id));
    }
}