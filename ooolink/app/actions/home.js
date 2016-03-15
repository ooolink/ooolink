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

import {getTopics} from './content';

function getThemesFromServer(site) {
    "use strict";
    return dispatch => {
        return fetch(`${SERVER_ADDRESS}${site}/themes`)
            .then(response => response.json())
            .then(json => {
                let themes = json;
                dispatch(setThemesBlockHeight(computeThemeBlockHeight(themes)));
                dispatch({
                    type: ActionTypes.GET_THEMES,
                    themes,
                    site
                });
                dispatch(selectTheme(site, themes[0]));
            });
    }
}

export function selectTheme(site, theme) {
    "use strict";
    return (dispatch, getState)=> {
        if (getState().home.themeSelected === theme) {
            return;
        }
        dispatch({type: ActionTypes.CHANGE_THEME, theme});
        return dispatch(getTopics(site, theme));
    };
}

export function setThemesBlockHeight(height) {
    "use strict";
    return {type: ActionTypes.SET_THEMES_BLOCK_HEIGHT, height};
}

export function getThemes(site) {
    "use strict";
    return (dispatch, getState) => {
        let themes = getState().home.themes[site] || [];
        if (themes.length > 1) {
            dispatch(selectTheme(site, themes[0]));
            dispatch({
                type: ActionTypes.GET_THEMES,
                themes
            });
            return dispatch(setThemesBlockHeight(computeThemeBlockHeight(themes)));
        }
        return dispatch(getThemesFromServer(site))
    }
}

export function clearThemes() {
    "use strict";
    return {
        type: ActionTypes.CLEAR_THEMES
    }
}