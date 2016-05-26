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
        case types.ADD_SITE_FOCUS:
            let flag = false;
            state.siteFocus.forEach(site=>{
                if (site.collection_site === state.currentSite){
                    flag = true;
                }
            });
            if (!flag){
                state.siteFocus.unshift({
                    collection_site: state.currentSite,
                    collection_desc: action.site.desc,
                    collection_site_name: action.site.title,
                    collection_site_image: action.site.image
                });  
            }
            return Object.assign({}, state);
        case types.RM_SITE_FOCUS:
            state.siteFocus.forEach((site, idx)=>{
                if (site.collection_site === action.site){
                    state.siteFocus.splice(idx, 1);
                }
            });
            return Object.assign({}, state);
        case types.GET_SITE_FOCUS:
            state.siteFocus = action.sites;
            return Object.assign({}, state);
        default:
            return state;
    }
}
