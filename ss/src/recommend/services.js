/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const ContentCreate = require('../models').Content;

export function getWelcome(time, location, user, successFunc, errorFunc) {
    let as = '04be9c7c2e7f7eda6febba12aa579a8d'.substr(0, 2).toLowerCase(),
        Content = ContentCreate(as);

    Content.findOne({
    }, {
        site_id: 0
    }, {
        lean: true
    })
    .where('image').ne('')
    .sort({updated: -1})
    .skip(parseInt((Math.random()*10+Math.random()*10).toFixed(0)))
    .exec((err, content) => {
        if (err || !content) {
            _serviceLog.error(_log('recommend', 'getWelcome', '获取内容失败', __filename, 24));
            errorFunc('rsNullError');
        } else {
            successFunc({
                result: 1,
                data: content
            });
        }
    });
}

export function getRecommandByType(){
    
}