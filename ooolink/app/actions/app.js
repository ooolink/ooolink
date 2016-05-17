/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as ActionTypes from '../constants/actionTypes';
import * as collectService from '../services/collectService';
import {SERVER_ADDRESS} from '../constants/config';
import {clearContent} from '../actions/content';
import {setThemesBlockHeight,selectTheme} from '../actions/home';
import {computeThemeBlockHeight} from '../utils';

function getSiteInfoFromServer(site) {
    "use strict";
    return (dispatch)=> {
        fetch(`${SERVER_ADDRESS}site/conf?site=${site}`)
            .then(response=>response.json())
            .then(info=> {
                if (!info.result){
                    //TODO 
                } else {
                    info = info.data;
                    info.site_themes = JSON.parse(info.site_themes);
                    info.site_themes.themes.unshift('全部');
                    info.site_themes.themesmap.unshift('_all_');
                    dispatch(selectTheme(site, 0, info.site_themes));
                    dispatch(setThemesBlockHeight(computeThemeBlockHeight(info.site_themes.themes)));
                    dispatch({
                        type: ActionTypes.GET_SITE_INFO,
                        site,
                        info
                    });
                }
            })
    }
}

export function getSiteInfo(site) {
    "use strict";
    return (dispatch, getState)=> {
        dispatch({
            type: ActionTypes.SITE_LOADING
        });
        return dispatch(getSiteInfoFromServer(site));
    }
}

export function collectSiteFocus(site) {
    "use strict";
    return {
        type: ActionTypes.ADD_SITE_FOCUS,
        site
    }
}

export function unCollectSiteFocus(site) {
    "use strict";
    return {
        type: ActionTypes.RM_SITE_FOCUS,
        site
    }
}

function getFocusSiteFromServer(token) {
    "use strict";
    return (dispatch)=> {
        collectService.getSitefocused(token, (rs)=> {
            dispatch({
                type: ActionTypes.GET_SITE_FOCUS,
                sites: rs.collections
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