/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as siteService from './services/site'; 
export default (router)=> {
    "use strict";
    router.get('/manager/index', function *(next) {
        yield this.render('index', {
        		data: 1
        });
    });

    router.post('/manager/site', function *(next) {
    		yield siteService.siteAdd.call(this);
    });
}