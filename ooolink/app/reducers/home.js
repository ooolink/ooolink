/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as types from '../constants/actionTypes'

//0 view, 1 person, 2 setting
const initialState = {
    themeSelected: '',
    themeSelectedWord: '',
    themesBlockHeight: 40
};

export default function(state = initialState, action) {

    switch (action.type) {
        case types.SET_THEMES_BLOCK_HEIGHT:
            return Object.assign({}, state, {
                themesBlockHeight: action.height
            });
        case types.CHANGE_THEME:
            return Object.assign({}, state, {
                themeSelected: action.theme,
                themeSelectedWord: action.themeWord
            });
        default:
            return state;
    }
}