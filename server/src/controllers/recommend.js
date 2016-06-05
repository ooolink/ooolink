/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
 "use strict";
import * as recommendService from '../services/recommend';
import * as contentService from '../services/content';
import {headAuth} from '../tools/auth';

 export const recommendImageToWelcome = function *(next){
    
    this.body = {
        result: 1,
        data: "https://s-media-cache-ak0.pinimg.com/564x/dc/5d/55/dc5d555c4ddf9db00565c8ae73643619.jpg"
    }
 }

 export const getWelcomeContent = function *(next){
    let {time} = this.query;
    let rs = yield recommendService.getOneRecommend(time);
    this.body = rs;
 }

 export const getSeaGlobalContents = function *(next){
    let page = this.query.page;
    let rs = yield recommendService.getSeaGlobalContents(page);
    this.body = rs;
 }

 export const getRecommendContents = function *(next){
    let limit = parseInt(this.query.limit);
    let rs = false;
    try{
        rs = yield headAuth('x-access-token');
    } catch (e){
        rs = false;
    }
    if (rs){
        //用户推荐

    } else {
        //非用户推荐
    }
 }

 export const getRecommendArtificial = function *(next){
    let limit = parseInt(this.query.limit);
    limit = limit > 5 ? 5 : limit;
    let contentids = yield recommendService.getContentIdFromArtificial(limit);

    let map = {},
        data = [],
        ids = [];
    contentids.forEach(item=>{
        map[item.mixed_id] = item.dataValues;
        ids.push(item.mixed_id);
    });

    if (ids.length){
        let cnts = yield contentService.getContentByIds(ids, {content: 0});
        cnts.forEach(cnt=>{
            map[cnt.content_id].content = cnt;
            data.push(map[cnt.content_id]);
        });
    }

    this.body = {
        result: 1,
        data
    }
 }
















