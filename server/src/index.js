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
import koaBody from 'koa-better-body';
import _router from './router';
import config from '../config.json';

const app = koa();
const router = _router(koaRouter());

app
    .use(koaBody({
        extendTypes: {
            json: ['application/x-javascript'],
            multipart: ['multipart/mixed']
        }
    }))
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(config.http.port);