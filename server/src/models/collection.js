/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import Sequelize from 'sequelize';
import {getMysql} from '../services/cache';

const db = getMysql();
const Collection = db.define('collection', {
    id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    collection_id: {type: Sequelize.STRING(64)},
    collection_site: {type: Sequelize.STRING(64)},
    collection_site_name: {type: Sequelize.STRING(64)},
    collection_flag: {type: Sequelize.STRING(256)},
    collection_type: {type: Sequelize.STRING(10)},
    collection_created: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    collection_title: {type: Sequelize.STRING(128)},
    collection_content: {type: Sequelize.TEXT},
    collection_userId: {type: Sequelize.INTEGER},
    collection_status: {type: Sequelize.INTEGER}
}, {
    freezeTableName: true,
    timestamps: false
}, {indexes: [{unique: true, fields: ['collection_id', 'collection_userId']}]});

Collection.sync();

export default Collection;