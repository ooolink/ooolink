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
import {computeThemeBlockHeight} from '../utils';

function getThemesFromServer(site) {
    "use strict";
    return dispatch => {
        return fetch(`${SERVER_ADDRESS}${site}/themes`)
            .then(response => response.json())
            .then(json => {
                let themes = json.concat(json).concat(['时代', '阿萨德撒', '阿萨飒飒爱上时代2213ad', '12312332', 'hasdoowqe', 'asdqwe', '阿萨飒飒爱上时代2213ad', '阿萨飒飒爱上时代2213ad12assdads阿斯达']).concat(json).concat(['时代', '阿萨德撒', '阿萨飒飒爱上2213ad']);
                dispatch(setThemesBlockHeight(computeThemeBlockHeight(themes)));
                dispatch({
                    type: ActionTypes.GET_THEMES,
                    themes
                });
            });
    }
}

export function selectPage(page) {
    return {type: ActionTypes.CHANGE_PAGE, page}
}

export function setThemesBlockHeight(height) {
    "use strict";
    return {type: ActionTypes.SET_THEMES_BLOCK_HEIGHT, height};
}

export function getThemes() {
    "use strict";
    return (dispatch, getState) => {
        let site = getState().app.currentSite;
        return dispatch(getThemesFromServer(site))
    }
}
