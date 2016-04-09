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
 const Sites = db.define('sites', {
 		 id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
 		 site_name: {type: Sequelize.STRING(64)},
 		 site_desc: {type: Sequelize.STRING(256)},
 		 site_image: {type: Sequelize.STRING(512)},
 		 site_themes: {type: Sequelize.STRING(512)},
 		 site_id: {type: Sequelize.STRING(64), unique: true},
 		 site_fn: {type: Sequelize.STRING(512)},
 		 site_config: {type: Sequelize.STRING(512)},
 		 site_type: {type: Sequelize.STRING(32)},
 		 site_plugin: {type: Sequelize.STRING(512)},
 		 site_created: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
 		 site_updated: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
 }, {
 		freezeTableName: true,
 		timestamps: false
 });

 Sites.sync();

 export default Sites;
