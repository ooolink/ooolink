/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import * as publishService from '../services/publish'

 export const getPublishType = function *(){
    let site = this.query.site;
    let rs = yield publishService.getPublishType(site);
    this.body = {
        result: 1,
        data: rs.data
    }
 }

 export const publishContent = function *(){
    let {title, content, theme, site, extToken} = this.request.body.fields;
    let rs = yield publishService.publishContent(site, title, content, theme, extToken);
    
 }