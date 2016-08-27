/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import process from 'process';
import path from 'path';
import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-better-body';
import koaEjs from 'koa-ejs';
import koaStatic from 'koa-static';
import config from '../config.json';

if (process.env.SS_ADMIN_RUN && process.env.SS_ADMIN_RUN === 'MAIN'){
	run();
} else {	//CALL
	module.exports = run;
}

function run(){
	const app = koa();
	const router = koaRouter();	
    
    app.use(koaStatic(path.join(__dirname, './views/staics')));
    koaEjs(app, {
        root: path.join(__dirname, './', 'views/pages'),
        layout: 'template',
        viewExt: 'ejs',
        cache: true,
        debug: true
    });

    app
    .use(koaBody({
        extendTypes: {
            json: ['application/x-javascript'],
            multipart: ['multipart/mixed']
        }
    }))
    .use(router.routes())
    .use(router.allowedMethods());

    app.listen(config.admin.port);
}

