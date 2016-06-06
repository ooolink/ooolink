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
 const Message = db.define('messages', {
         id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
         message_type: {type: Sequelize.STRING(10)},
         message_origin: {type: Sequelize.STRING(128)},
         message_from: {type: Sequelize.STRING(128)},
         message_to: {type:Sequelize.STRING(128)},
         message_title: {type: Sequelize.STRING(128)},
         message_content: {type: Sequelize.TEXT},
         message_created: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
 }, {
        freezeTableName: true,
        timestamps: false
 });

 Message.sync();

 export default Message;
