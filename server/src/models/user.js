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
const User = db.define('user', {
    id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    user_name: {type: Sequelize.STRING(20), unique: true},
    user_password: {type: Sequelize.STRING(64)},
    user_salt: {type: Sequelize.STRING(64)},
    user_created: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    user_token: {type: Sequelize.STRING(64)},
    user_authtime: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    user_collection_type: {type: Sequelize.STRING(512)},
    user_focus_type: {type: Sequelize.STRING(1024), defaultValue: JSON.stringify([{name:'default', id: 'default'}])},
    site_id: {type: Sequelize.STRING(64)},                                          //是哪个站点的子账号
    site_user: {type: Sequelize.STRING(512)}                                        //子账号相关信息
}, {
    freezeTableName: true,
    timestamps: false
});

User.sync();

export default User;