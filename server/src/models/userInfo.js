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
const UserInfo = db.define('userInfo', {
    id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    user_realname: {type: Sequelize.STRING(64)},
    user_sex: {type: Sequelize.INTEGER},
    user_desc: {type: Sequelize.STRING(256)},
    user_work: {type: Sequelize.STRING(256)},
    user_living: {type: Sequelize.STRING(256)},
    user_education: {type: Sequelize.STRING(256)},
    user_image: {type: Sequelize.STRING(512)},
    user_id: {type: Sequelize.INTEGER, unique: true}
}, {
    freezeTableName: true,
    timestamps: false
});

UserInfo.sync();

export default UserInfo;