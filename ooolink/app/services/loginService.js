/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import {SERVER_ADDRESS} from '../constants/config';

export function login(name, pwd) {
    "use strict";

}

export function sign(name, pwd, cb) {
    "use strict";

    fetch(`${SERVER_ADDRESS}user/sign`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `name=${name}&password=${pwd}`
    })
        .then(response=>response.json())
        .then(rs=> {
            cb(rs);
        })
}

