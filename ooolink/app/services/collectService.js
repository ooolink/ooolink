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

export function collected(contentid, token, type, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}collect/content`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `token=${token}&contentid=${contentid}&type=${type}`
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
                        collected(contentid, rs.data, type, cb);
                    }
                });
            } else {
                cb({result: 0});
            }
            return;
        })
        .then(rs=> {
            cb(rs);
        });
}

export function uncollected(contentid, token, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}collect/content`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `contentid=${contentid}&token=${token}`
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
                        collected(contentid, rs.data, type, cb);
                    }
                });
            } else {
                cb({result: 0});
            }
            return;
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

export function judgeCollected(token, contentId, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}collect/judgecontent`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `token=${token}&contentid=${contentId}`
    })
        .then(response=>{
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401){
                loginService.reAuth(rs=>{
                    if (rs && rs.result === 401){
                        cb({result: 401});
                    } else if (rs && rs.result === 1){
                        judgeCollected(rs.data, contentId, cb);
                    }
                });
            } else {
                cb({result: 0});
            }
            return;
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
    fetch(`${SERVER_ADDRESS}collect/site`, {
        method: "DELETE",
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
                        unCollectedSite(site, rs.data, cb);
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
    fetch(`${SERVER_ADDRESS}collect/judgesite`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `token=${token}&site=${site}`
    })
        .then(response=>{
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401){
                loginService.reAuth(rs=>{
                    if (rs && rs.result === 401){
                        cb({result: 401});
                    } else if (rs && rs.result === 1){
                        judgeSiteFocused(rs.data, site, cb);
                    }
                });
            } else {
                cb({result: 0});
            }
            return;
        })
        .then(rs=>{
            cb(rs);
        })
}

export function createUserCollectionType(token, type, cb) {
    fetch(`${SERVER_ADDRESS}user/collectiontype`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `token=${token}&type=${type}`
    })
        .then(response=>{
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401){
                loginService.reAuth(rs=>{
                    if (rs && rs.result === 401){
                        cb({result: 401});
                    } else if (rs && rs.result === 1){
                        createUserCollectionType(rs.data, type, cb);
                    }
                });
            } else {
                cb({result: 0});
            }
            return;
        })
        .then(rs=>{
            rs && cb(rs);
        });
}

export function getUserCollectionType(token, cb) {
    fetch(`${SERVER_ADDRESS}user/collectiontype`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `token=${token}`
    })
        .then(response=>{
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 401){
                loginService.reAuth(rs=>{
                    if (rs && rs.result === 401){
                        cb({result: 401});
                    } else if (rs && rs.result === 1){
                        getUserCollectionType(rs.data, cb);
                    }
                });
            } else {
                cb({result: 0});
            }
            return;
        })
        .then(rs=>{
            rs && setGlobal('userCollectionTypes', rs.data, 1000*60*5);
            rs && cb(rs);
        });
}



















