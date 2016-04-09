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
 const Admins = db.define('admins', {
 		id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    admin_name: {type: Sequelize.STRING(20), unique: true},
    admin_password: {type: Sequelize.STRING(64)},
    admin_salt: {type: Sequelize.STRING(64)},
    admin_created: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    admin_token: {type: Sequelize.STRING(64)}
 }, {
 		freezeTableName: true,
 		timestamps: false
 });

 Admins.sync();

 export default Admins;
