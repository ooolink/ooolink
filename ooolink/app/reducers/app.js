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
    token: []
};

export default function(state = initialState, action) {
    "use strict";

    switch (action.type) {
        case types.SET_CURRENT_SITE:
            return {
                currentSite: action.site
            };
        default:
            return state;
    }
}
