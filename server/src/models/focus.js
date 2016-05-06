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
const Focus = db.define('focus', {
    id: {type: Sequelize.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    focus_type: {type: Sequelize.STRING(10)},
    focus_id: {type: Sequelize.STRING(128)},
    focus_name: {type: Sequelize.STRING(128)},
    focus_userId: {type: Sequelize.INTEGER},
    focus_status: {type: Sequelize.INTEGER},
    focus_created: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
}, {
    freezeTableName: true,
    timestamps: false,
    indexes: [
        {
            unique: true, 
            name: 'unique_focus',
            fields: ['focus_id', 'focus_userId']
        }
    ]
});

Focus.sync();

export default Focus;