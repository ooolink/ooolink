/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as loginService from './loginService';
import {SERVER_ADDRESS} from '../constants/config';
import {getGlobal, setGlobal} from '../store'

export function collected(site, sitename, title, content, flag, type, token, cb, isNeedToSite = false) {
    "use strict";
    fetch(`${SERVER_ADDRESS}collect`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `site=${site}&title=${title}&content=${content}&flag=${flag}&type=${type}&token=${token}&sitename=${sitename}`
    })
        .then(response=> {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(rs=> {
            cb(rs);
        });
}

export function uncollected(id, token, cb, isNeedToSite = false) {
    "use strict";
    fetch(`${SERVER_ADDRESS}collect`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id=${id}&token=${token}`
    })
        .then(response=> {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(rs=> {
            cb(rs);
        });
}

export function getCollections(token, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}user/collect`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `token=${token}`
    })
        .then(response=> {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(rs=> {
            cb(rs);
        });
}

export function judgeCollected(token, site, topicId, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}user/collected`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `token=${token}&site=${site}&id=${topicId}`
    })
        .then(response=>{
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(rs=> {
            cb(rs);
        })
}

export function collectedSite(site, token, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}collect/site`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `token=${token}&site=${site}`
    })
        .then(response=> {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401){
                loginService.reAuth((rs)=>{
                    if (rs && rs.result === 401){
                        setGlobal('isLogin', false);
                        cb({result: 401});
                    } else {
                        collectedSite(site, rs.data, cb);
                    }
                });
            } else {
                cb({result: 0});
            }
            return;
        })
        .then(rs=> {
            rs && cb(rs);
        });
}

export function unCollectedSite(site, token, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}${site}/collect`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `token=${token}`
    })
        .then(response=> {
            if (response.status === 200) {
                return response.json();
            } else {
                cb({result: 0});
            }
        })
        .then(rs=> {
            cb(rs);
        });
}

export function getSitefocused(token, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}user/sitefocus`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `token=${token}`
    })
        .then(response=> {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(rs=> {
            cb(rs);
        });
}

export function judgeSiteFocused(token, site, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}user/sitefocused`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `token=${token}&site=${site}`
    })
        .then(response=>{
            if (response.status === 200) {
                return response.json();
            }
        })
        .then(rs=>{
            cb(rs);
        })
}