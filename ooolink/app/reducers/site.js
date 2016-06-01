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
    userSiteFocus: []
};

export default function(state = initialState, action) {

    switch (action.type) {
        case types.UPDATE_SITE_FOCUS:
            state.userSiteFocus = action.sites;
            return Object.assign({}, state);
        default:
            return state;
    }
}