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
    currentSite: 'cnode-bbs',
    siteFocus: {},
    token: {},
    siteInfo: {},
    appLoaded: false
};

export default function(state = initialState, action) {
    "use strict";

    switch (action.type) {
        case types.APP_LOADING:
            return Object.assign({}, state, {
                appLoaded: false
            });
        case types.GET_SITE_INFO:
            state.siteInfo[action.site] = action.info;
            return Object.assign({}, state, {
                appLoaded: true,
                currentSite: action.site
            });
        case types.ADD_SITE_FOCUS:
            state.siteFocus[action.site] = true;
            return Object.assign({}, state);
        case types.RM_SITE_FOCUS:
            delete state.siteFocus[action.site];
            return Object.assign({}, state);
        default:
            return state;
    }
}
