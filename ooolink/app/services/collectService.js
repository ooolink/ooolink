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
import {getGlobal, setGlobal} from '../store';
import {responseAuth} from './base';

export function collected(contentid, token, type, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}collect/content`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'x-access-token': token
        },
        body: `contentid=${contentid}&type=${type}`
    })
        .then(responseAuth(token=>{
            collected(contentid, token, type, cb);
        }, cb))
        .then(rs=> {
            cb(rs);
        });
}

export function uncollected(contentid, token, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}collect/content`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'x-access-token': token
        },
        body: `contentid=${contentid}`
    })
        .then(responseAuth(token=>{
            uncollected(contentid, token, cb);
        }, cb))
        .then(rs=> {
            cb(rs);
        });
}

export function getCollections(token, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}user/collectionsgeneral`, {
        method: "GET",
        headers: {
            "x-access-token": token
        }
    })
        .then(responseAuth(token=>{
            getCollections(token, cb);
        }, cb))
        .then(rs=> {
            cb(rs);
        });
}

export function getCollectionsDetail(token, type, cb){
    fetch(`${SERVER_ADDRESS}user/collectionsdetail?type=${type}`, {
        method: "GET",
        headers: {
            "x-access-token": token
        }
    })
        .then(responseAuth(token=>{
            getCollectionsDetail(token, type, cb);
        }, cb))
        .then(rs=> {
            cb(rs);
        });
}

export function judgeCollected(token, contentId, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}collect/content?contentid=${contentId}`, {
        method: 'GET',
        headers: {
            "x-access-token": token
        }
    })
        .then(responseAuth(token=>{
            judgeCollected(token, contentId, cb);
        }, cb))
        .then(rs=> {
            cb(rs);
        })
}

export function collectedSite(site, token, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}collect/site`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'x-access-token':token
        },
        body: `site=${site}`
    })
        .then(responseAuth(token=>{
            collectedSite(site, token, cb);
        }, cb))
        .then(rs=> {
            rs && cb(rs);
        });
}

export function unCollectedSite(site, token, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}collect/site`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'x-access-token': token
        },
        body: `site=${site}`
    })
        .then(responseAuth(token=>{
            unCollectedSite(site, token, cb);
        }, cb))
        .then(rs=> {
            rs && cb(rs);
        });
}

export function getSitefocused(token, page, limit, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}user/focus?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            "x-access-token": token
        }
    })
        .then(responseAuth(token=>{
            getSitefocused(token, page, limit, cb);
        }, cb))
        .then(rs=> {
            cb(rs);
        });
}

export function judgeSiteFocused(token, site, cb) {
    "use strict";
    fetch(`${SERVER_ADDRESS}collect/site?site=${site}`, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
        .then(responseAuth(token=>{
            judgeSiteFocused(token, site, cb);
        }, cb))
        .then(rs=>{
            cb(rs);
        })
}

export function createUserCollectionType(token, type, cb) {
    fetch(`${SERVER_ADDRESS}user/collectiontype`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'x-access-token': token
        },
        body: `type=${type}`
    })
        .then(responseAuth(token=>{
            createUserCollectionType(token, type, cb);
        }, cb))
        .then(rs=>{
            rs && cb(rs);
        });
}

export function deleteUserCollectionType(token, type, cb){
    fetch(`${SERVER_ADDRESS}user/collectiontype`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'x-access-token': token
        },
        body: `type=${type}`
    })
        .then(responseAuth(token=>{
            deleteUserCollectionType(token, type, cb);
        }, cb))
        .then(rs=>{
            rs && cb(rs);
        });
}

export function updateUserCollectionType(token, ntype, otype, cb){
    fetch(`${SERVER_ADDRESS}user/collectiontype`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'x-access-token': token
        },
        body: `ntype=${ntype}&otype=${otype}`
    })
        .then(responseAuth(token=>{
            updateUserCollectionType(token, ntype, otype, cb);
        }, cb))
        .then(rs=>{
            rs && cb(rs);
        });
}

export function getUserCollectionType(token, cb) {
    fetch(`${SERVER_ADDRESS}user/collectiontype`, {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    })
        .then(responseAuth(token=>{
            getUserCollectionType(token, cb);
        }, cb))
        .then(rs=>{
            rs && rs.result === 1 && setGlobal('userCollectionTypes', rs.data, 1000*60*2);
            cb(rs);
        });
}









