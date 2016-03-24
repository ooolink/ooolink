/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import querystring from 'querystring';
import url from 'url';

export function topicsModelTransform(data) {
    "use strict";
    data = data.map(item=> {
        let d = {};
        d.id = querystring.parse(url.parse(item.guid).query).p;
        d.author_id = item.author;
        d.tab = '';
        d.content = item.description;
        d.title = item.title;
        d.reply_count = 0;
        d.visit_count = 0;
        d.create_at = item.date;
        d.author = {
            loginname: item.author,
            avatar_url: 'http://tp2.sinaimg.cn/5192813105/50/5698640042/0'
        };
        return d;
    });
    let rs = {
        site: 'linuxstory-blog',
        data
    };
    return rs;
}
