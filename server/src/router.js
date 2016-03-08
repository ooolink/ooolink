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

const SITES = fs.readdirSync(`${__dirname}/sites/`);

export default (router)=> {
    "use strict";

    var error_auth = function() {
        this.body = 'Auth Error';
        this.status = 403;
    };

    var methodAuth = method => {
        return function *(next) {
            if (this.body._method === method) {
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

    router.get('/:site/user/:name', function *(next) {

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

    router.get('/:site/group/:id', function *(next) {

    });

    router.get('/:site/topic/:id', function *(next) {

    });

    router.post('/:site/topic', function *(next) {

    });

    router.post('/:site/topic/:id', methodAuth('delete'), function *(next) {

    });

    router.post('/:site/topic/:id', methodAuth('put'), function *(next) {

    });

    return router;
}