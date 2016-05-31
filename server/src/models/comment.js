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
const Comment = db.define('comment', {
    id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    content: {type: Sequelize.TEXT},
    content_id: {type: Sequelize.STRING(128)},
    user_id: {type: Sequelize.INTEGER},
    reply_id: {type: Sequelize.INTEGER},
    deleted: {type: Sequelize.BOOLEAN},
    created: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
    updated: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
}, {
    freezeTableName: true,
    timestamps: false
});

Comment.sync();

export default Comment;