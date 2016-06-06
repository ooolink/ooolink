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
       
 }, {
        freezeTableName: true,
        timestamps: false
 });

 Message.sync();

 export default Message;
