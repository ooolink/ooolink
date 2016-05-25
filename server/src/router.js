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
import {blankAuth, methodAuth} from './tools/auth';
import * as siteController from './controllers/site';
import * as searchController from './controllers/search';
import * as userController from './controllers/user';
import * as collectController from './controllers/collect';
import * as recommendController from './controllers/recommend';
import * as _controller from './controller';
import * as searchService from './services/search';
import * as collectService from './services/collect';
import log from './services/log';

const SITES = fs.readdirSync(`${__dirname}/sites/`);

export default (router)=> {
    "use strict";

    router.use('/', log);

    router.post('/search', blankAuth(null, ['type']), searchController.searchEntrance);

    router.post('/collect/site', blankAuth(null, ['site', 'token']), userController.auth, collectController.collectSite);

    router.delete('/collect/site', blankAuth(null, ['site', 'token']), userController.auth, collectController.unCollectSite);

    router.post('/sites', blankAuth(['type'],['limit', 'page']), siteController.getSiteByType);

    router.use('/site', blankAuth(['site']), siteController.siteEntrance);

    router.get('/site/conf', siteController.getSiteConf);

    router.get('/site/user/:name', function *(next) {

    });

    router.get('/site/user', function*(next) {

    });

    router.post('/site/user', function *(next) {

    });

    router.post('/site/user/:name', methodAuth('delete'), function *(next) {
    });

    router.post('/site/user/:name', methodAuth('put'), function *(next) {

    });

    router.get('/site/theme', blankAuth(['theme', 'limit', 'page']), siteController.getSiteContentBySiteId);


    router.get('/site/topic/:id', blankAuth(['site'], null, ['id']), siteController.getSiteContentByContentId);

    router.post('/site/topic', function *(next) {
        yield _controller.publishTopic.call(this);
    });

    router.post('/site/topic/:id', methodAuth('delete'), function *(next) {

    });

    router.post('/site/topic/:id', methodAuth('put'), function *(next) {

    });

    router.post('/site/comment', function *(next) {
        yield _controller.publishComment.call(this);
    });

    router.post('/site/comment/:id', methodAuth('delete'), function *(next) {

    });

    router.post('/site/comment/:id', methodAuth('put'), function *(next) {

    });

    router.post('/user/login', userController.login);

    router.post('/user/session', userController.session);

    router.post('/user/sign', userController.sign);

    router.post('/user/collect', userController.auth, function *(next) {
        yield collectService.getCollections.call(this);
    });

    router.post('/user/collected', userController.auth, function *(next) {
        yield collectService.judgeCollected.call(this);
    });

    router.post('/user/sitefocus', userController.auth, function *(next) {
        yield collectService.getSitefocused.call(this);
    });

    router.post('/user/sitefocused', userController.auth, function *(next){
        yield collectService.judgeSiteFocused.call(this);
    });

    router.post('/collect', userController.auth, function *(next) {
        yield collectService.collected.call(this);
    });

    router.delete('/collect', userController.auth, function *() {
        yield collectService.unCollected.call(this);
    });

    router.post('/collect', methodAuth('delete'), userController.auth, function *(next) {
        yield collectService.unCollected.call(this);
    });

    router.get('/recommend/welcome', blankAuth(['time']), recommendController.getWelcomeContent)

    return router;
}