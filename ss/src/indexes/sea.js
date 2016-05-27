/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import redis from 'redis'
const redisClient = redis.createClient();

//size 海淘总是记录前 size 条 
function seaGlobalModel(size, pageSize){

    let idx = 0;
    let pidx = redisClient.get('ss_indexes_sea_pidx') || 0;
    return {
        add: (content)=>{
            redisClient.hset(`ss_indexes_sea_contents_${pidx}`, `ss_indexes_sea_contents_${idx}`, JSON.stringify(content));
            idx++;
            if (idx >= pageSize){
                pidx++;
                idx = 0;
                if (pidx * pageSize >= size){
                  pidx = 0;
                }
                redisClient.set('ss_indexes_sea_pidx', pidx);
            }
        },
        get: (page, cb)=>{
            page = page % (size / pageSize);
            redisClient.hgetall(`ss_indexes_sea_contents_${page}`, function(err, contents){
                if (err){
                    _cacheLog.error(_log('indexes', `getSeaContents${page}`, `获取海淘第${page}页内容失败,${err}`, __filename, 34));
                    cb(null);
                } else {
                    cb(contents);
                }
            });
        }
    }
}

let model = seaGlobalModel(200, 20);

export default function (consumer){
    consumer.onGroupMessage('ss_content_new', params=>{
        model.add(params.content);
    });

    consumer.onRequestService('ss_indexes_getSeaContents', (params, successFunc, errorFunc)=>{
        model.get(params.page, (contents)=>{
            if (contents){
                successFunc({result: 1, data: contents});
            } else {
                errorFunc('rsNullError');
            }
        });
    });
}




