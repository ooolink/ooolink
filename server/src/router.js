/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import fs from 'fs';
import path from 'path';
import * as _controller from './controller';
import * as searchService from './services/search';
import * as loginService from './services/login';
import * as collectService from './services/collect';

const SITES = fs.readdirSync(`${__dirname}/sites/`);

export default (router)=> {
    "use strict";

    var error_auth = function() {
        this.body = 'Auth Error';
        this.status = 403;
    };

    var methodAuth = method => {
        return function *(next) {
            if (this.request.body.fields._method === method) {
                yield next;
            } else {
                error_auth.call(this);
            }
        }
    };

    router.use('/:site', function *(next) {

        if (!~SITES.indexOf(this.params.site)) {
            this.params.site = 'default';
        }

        yield next;
    });

    router.get('/search', function *(next) {
        if (this.query.type) {
            yield searchService.getSiteByType.call(this);
        } else {
            yield searchService.getFamous.call(this);
        }
    });

    router.get('/:site/conf', function *(next) {
        yield _controller.getSiteConf.call(this);
    });

    router.post('/user/login', function*(next) {
        yield loginService.login.call(this);
    });

    router.post('/user/session', function*(next) {
        yield loginService.session.call(this);
    });

    router.post('/user/sign', function*(next) {
        yield loginService.sign.call(this);
    });

    router.post('/user/collect', loginService.auth, function *(next) {
        yield collectService.getCollections.call(this);
    });

    router.post('/user/sitefocus', loginService.auth, function *(next) {
        yield collectService.getSitefocused.call(this);
    });

    router.post('/collect', loginService.auth, function *(next) {
        yield collectService.collected.call(this);
    });

    router.delete('/collect', loginService.auth, function *() {
        yield collectService.unCollected.call(this);
    });

    router.post('/collect', methodAuth('delete'), loginService.auth, function *(next) {
        yield collectService.unCollected.call(this);
    });

    router.post('/:site/collect', loginService.auth, function *() {
        yield collectService.collectedSite.call(this);
    });

    router.delete('/:site/collect', loginService.auth, function *() {
        yield collectService.unCollectedSite.call(this);
    });

    router.post('/:site/collect', methodAuth('delete'), loginService.auth, function *(next) {
        yield collectService.unCollectedSite.call(this);
    });

    router.get('/:site/user/:name', function *(next) {

    });

    router.get('/:site/user', function*(next) {

    });

    router.post('/:site/user', function *(next) {

    });

    router.post('/:site/user/:name', methodAuth('delete'), function *(next) {
    });

    router.post('/:site/user/:name', methodAuth('put'), function *(next) {

    });

    router.get('/:site/themes', function *(next) {
        yield _controller.getThemes.call(this);
    });

    router.get('/:site/theme/:id', function *(next) {
        yield _controller.getTheme.call(this);
    });


    router.get('/:site/topic/:id', function *(next) {
        yield _controller.getTopic.call(this);
    });

    router.post('/:site/topic', function *(next) {

    });

    router.post('/:site/topic/:id', methodAuth('delete'), function *(next) {

    });

    router.post('/:site/topic/:id', methodAuth('put'), function *(next) {

    });

    router.post('/:site/comment', function *(next) {

    });

    router.post('/:site/comment/:id', methodAuth('delete'), function *(next) {

    });

    router.post('/:site/comment/:id', methodAuth('put'), function *(next) {

    });

    return router;
}