/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import home from './home';
import app from './app';
import content from './content';
import user from './user';
import collect from './collect';
import comment from './comment';
import site from './site';
import { combineReducers } from 'redux';

export default combineReducers({
    home,
    app,
    content,
    user,
    collect,
    comment,
    site
});

