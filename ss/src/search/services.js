/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const SearchIndex = require('../models').SearchIndex;
import * as chineseFenci from './chineseFenci';
import {shieldWord} from './shield';

export function setSearchIndex(content_id, title, desc, content=''){

    let fenciKW_Rs = chineseFenci.getKeyWords(title),
        fenciCS_Rs = chineseFenci.cutForSearch(title);

    SearchIndex.update(
        {content_id}, 
        {
            content_id, title, desc, content, 
            keywords: fenciKW_Rs.keys, 
            keywordsWeight: fenciKW_Rs.values, 
            forSearch: fenciCS_Rs
        }, 
        {upsert : true}, function(err){
        if (err){
            _modelLog.error(_log('searchIndex', 'setSearchIndex', `添加索引失败, ${err.message}`, __filename, 14));
        }
    });
}

export function searchContentByKeyWord(keyWord, page, limit, successFunc, errorFunc){
    
    //词语是否被屏蔽
    let isShielded = shieldWord(keyWord);
    if (isShielded){
        return errorFunc('checkError');
    }

    SearchIndex.find({
        $text: {$search: keyWord},
    }, {score: { $meta: "textScore" }, content_id: 1, title: 1, desc: 1})
    .sort({ score: { $meta: "textScore" } })
    .skip(page * limit)
    .limit(limit)
    .exec((err, output)=>{
        if (err){
            _modelLog.error(_log('searchIndex', 'searchContentByKeyWord', `失败, ${err.message}`, __filename, 32));
        } else {
            successFunc({
                result: 1,
                data: output
            })
        }
    });
}