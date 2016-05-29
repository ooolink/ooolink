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

function getCollectionsFromServer(token) {
    "use strict";
    return (dispatch)=> {
        collectService.getCollections(token, (rs)=> {
            dispatch({
                type: ActionTypes.GET_COLLECTIONS,
                collections: rs.data
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

function getFocusSiteFromServer(token) {
    "use strict";
    return (dispatch)=> {
        collectService.getSitefocused(token, (rs)=> {
            dispatch({
                type: ActionTypes.GET_SITE_FOCUS,
                sites: rs.data
            })
        })
    }
}

export function getFocusSite(token) {
    "use strict";
    return (dispatch, getState)=> {
        return dispatch(getFocusSiteFromServer(token));
    }
}