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
import {blankAuth, methodAuth, headAuth} from './tools/auth';
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

    router.post('/collect/site', headAuth(['x-access-token']), blankAuth(null, ['site']), userController.auth, collectController.collectSite);

    router.delete('/collect/site', headAuth(['x-access-token']), blankAuth(null, ['site']), userController.auth, collectController.unCollectSite);

    router.get('/collect/site', headAuth(['x-access-token']), blankAuth(['site']), userController.auth, collectController.isCollectedSite);

    router.post('/collect/content', headAuth(['x-access-token']), blankAuth(null, ['contentid', 'type']), userController.auth, collectController.collectContent);

    router.delete('/collect/content', headAuth(['x-access-token']), blankAuth(null, ['contentid']), userController.auth, collectController.unCollectContent);

    router.get('/collect/content', headAuth(['x-access-token']), blankAuth(['contentid']), userController.auth, collectController.isCollectedContent);

    router.get('/sites', blankAuth(['type', 'limit', 'page']), siteController.getSiteByType);

    router.use('/site', blankAuth(['site']), siteController.siteEntrance);

    router.get('/site/conf', siteController.getSiteConf);

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

    router.get('/user/collectionsgeneral', headAuth(['x-access-token']), userController.auth, userController.getUserCollectionsGeneral);

    router.get('/user/collectionsdetail', headAuth(['x-access-token'], blankAuth(['type'])), userController.auth, userController.getUserCollectionsDetail);

    router.get('/user/focus', headAuth(['x-access-token']), blankAuth(['page', 'limit']), userController.auth, userController.getUserFocus);

    router.get('/user/collectiontype', headAuth(['x-access-token']), userController.auth, userController.getUserCollectionTypes);

    router.post('/user/collectiontype', headAuth(['x-access-token']), blankAuth(null, ['type']), userController.auth, userController.createUserCollectionType);

    router.get('/recommend/welcome', blankAuth(['time']), recommendController.getWelcomeContent);

    router.get('/recommend/seaglobal', blankAuth(['page']), recommendController.getSeaGlobalContents);

    return router;
}