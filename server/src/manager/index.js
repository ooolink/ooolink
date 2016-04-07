/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import path from 'path';
import koaStatic from 'koa-static';
import koaEjs from 'koa-ejs';
import _router from './router';

export default (app, router)=> {
    "use strict";
    app.use(koaStatic(path.join(__dirname, '../../public')));
    koaEjs(app, {
        root: path.join(__dirname, '../../', 'public/pages'),
        layout: 'template',
        viewExt: 'ejs',
        cache: true,
        debug: true
    });
    _router(router);
}