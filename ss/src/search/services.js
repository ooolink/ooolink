/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const SearchIndex = require('../models').SearchIndex;
import {shieldWord} from './shield';

export function setSearchIndex(content_id, title, desc, content=''){
    SearchIndex.create({content_id, title, desc, content}, function(err){
        if (err){
            _modelLog.error(_log('searchIndex', 'setSearchIndex', '添加索引失败', __filename, 14));
        }
    });
}

export function searchContentByKeyWord(keyWord, successFunc, errorFunc){
    
    //词语是否被屏蔽
    let isShielded = shieldWord(keyWord);
    if (isShielded){
        return errorFunc('checkError');
    }

    SearchIndex.find({
        $text: {$search: keyWord}
    }, (err, output)=>{
        if (err){
            _modelLog.error(_log('searchIndex', 'searchContentByKeyWord', `失败，${err.message}`, __filename, 32));
        } else {
            successFunc({
                result: 1,
                data: output
            })
        }
    });
}