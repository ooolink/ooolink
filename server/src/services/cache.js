/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import Sequelize from 'sequelize';
import LRU from 'lru-cache';
const config = require('../../config.json');
const {dbname, username, password, host, port} = config.mysql;
const sequelize = new Sequelize(dbname, username, password, {
    host,
    port,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 2,
        idle: 10000
    },
    logging: ()=>{}
});
const fastCache = LRU(200);

export function getMysql() {
    "use strict";
    return sequelize;
}

export function getFastCache() {
    "use strict";
    return {
        set(key, value){
            fastCache.set(key, value);
        },
        get(key){
            fastCache.get(key);
        }
    }
}