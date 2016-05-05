/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as controller from './controller'; 
export default (router)=> {
    "use strict";
    router.get('/manager/index', controller.indexRender);

    router.post('/manager/site', controller.siteAdd);
}