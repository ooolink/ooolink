/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as ActionTypes from '../constants/actionTypes';
import {getTopics} from './content';

export function selectTheme(site, index, t) {
    "use strict";
    return (dispatch, getState)=> {
        dispatch({type: ActionTypes.CHANGE_THEME, theme: t.themesmap[index], themeWord: t.themes[index]});
        return dispatch(getTopics(site, t.themesmap[index]));
    };
}

export function setThemesBlockHeight(height) {
    "use strict";
    return {type: ActionTypes.SET_THEMES_BLOCK_HEIGHT, height};
}