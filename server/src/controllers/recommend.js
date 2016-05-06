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

 export const recommendImageToWelcome = function *(next){
    
    this.body = {
        result: 1,
        data: "https://s-media-cache-ak0.pinimg.com/564x/dc/5d/55/dc5d555c4ddf9db00565c8ae73643619.jpg"
    }
 }

 export const getWelcomeContent = function *(next){
    let rs = yield recommendService.getOneRecommend();
    this.body = rs;
 }