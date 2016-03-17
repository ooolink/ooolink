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
    user_token: {type: Sequelize.STRING(64)}
}, {
    freezeTableName: true,
    timestamps: false
});
export default User;