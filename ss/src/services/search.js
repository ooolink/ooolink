/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";
import {searchContentByKeyWord} from '../search/services';

export default function (consumer){
    consumer.onRequestService('ss_search_searchKeyword', (params, successFunc, errorFunc)=>{
        
        let {keyword, page, limit} = params;
        
        limit = limit > 10 ? 10 : limit;

        searchContentByKeyWord(keyword, page, limit, successFunc, errorFunc);
    });
};
