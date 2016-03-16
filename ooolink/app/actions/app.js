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
import {setThemesBlockHeight,selectTheme} from '../actions/home';
import {computeThemeBlockHeight} from '../utils';

function getSiteInfoFromServer(site) {
    "use strict";
    return (dispatch)=> {
        fetch(`${SERVER_ADDRESS}${site}/conf`)
            .then(response=>response.json())
            .then(info=> {
                dispatch(selectTheme(site, info.themes[0]));
                dispatch(setThemesBlockHeight(computeThemeBlockHeight(info.themes)));
                dispatch({
                    type: ActionTypes.GET_SITE_INFO,
                    site,
                    info
                })
            })
    }
}

export function getSiteInfo(site) {
    "use strict";
    return (dispatch, getState)=> {
        dispatch({
            type: ActionTypes.APP_LOADING
        });
        return dispatch(getSiteInfoFromServer(site));
    }
}