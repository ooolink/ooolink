/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import * as app from './app';
import * as content from './content';
import * as home from './home';
import * as collect from './collect';
import * as user from './user';
import * as comment from './comment';
import * as site from './site';
import * as message from './message';

let actions = {};
Object.assign(actions, app, content, home, collect, user, comment, site, message);

export default actions;