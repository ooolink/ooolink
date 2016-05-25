/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
 import {getWelcome} from '../recommend/services';
 export default function (consumer){
    consumer.onRequestService('ss_recommend_getWelcome', (params, successFunc, errorFunc)=>{
        let {time, location, user}  = params.recommend;
        getWelcome(time, location, user, successFunc, errorFunc);
    });
 };