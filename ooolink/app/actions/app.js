/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as ActionTypes from '../constants/actionTypes';
import {clearThemes, getThemes} from '../actions/home';
import {SERVER_ADDRESS} from '../constants/config';

function getSiteInfoFromServer(site) {
    "use strict";

}

export function changeSite(site) {
    "use strict";
    return (dispatch, getState) => {
        dispatch({
            type: ActionTypes.SET_CURRENT_SITE,
            site
        });
        return dispatch(getThemes());
    }
}

export function searchSite(value = '', type = '', cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}search?type=${type}&name=${value}`)
        .then(response => response.json())
        .then(json => {
            let sites = json;
            cb && cb(sites);
        });
}