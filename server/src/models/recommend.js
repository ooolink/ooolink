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
const Recommend = db.define('recommend', {
    id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    mixed_id: {type: Sequelize.STRING(128), unique: true},                                                         //任何形式的id  site content 等
    recommend_type: {type: Sequelize.STRING(16)},
    recommend_title: {type: Sequelize.STRING(128)},
    recommend_created: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
}, {
    freezeTableName: true,
    timestamps: false
});

Recommend.sync();

export default Recommend;