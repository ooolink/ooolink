/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import koa from 'koa';
import koaRouter from 'koa-router';
import _router from './router';

const app = koa();
const router = _router(koaRouter());

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3070);