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
    currentSite: '',
    siteFocus: [],
    siteInfo: {},
    appLoaded: true,
    siteLoaded: true,
    isAppLogined: false
};

export default function(state = initialState, action) {
    "use strict";

    switch (action.type) {
        case types.SITE_LOADING:
            return Object.assign({}, state, {
                siteLoaded: false
            });
        case types.APP_LOADING:
            return Object.assign({}, state, {
                appLoaded: false
            });
        case types.GET_SITE_INFO:
            state.siteInfo[action.site] = action.info;
            return Object.assign({}, state, {
                siteLoaded: true,
                currentSite: action.site
            });
        case types.GET_SITE_FOCUS:
            state.siteFocus = action.sites;
            return Object.assign({}, state);
        default:
            return state;
    }
}
