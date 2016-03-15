/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

export function topicsModelTransform(data) {
    "use strict";

    data = data.bbs.list.bbs.list;
    data = data.map((item)=> {
        let dd = item.data;
        let d = {};
        d.id = dd.id;
        d.author_id = dd.message.user.id;
        d.tab = '';
        d.content = dd.message.content;
        d.title = dd.message.title;
        d.reply_count = dd.comments.comment;
        d.visit_count = 0;
        d.create_at = dd.message.created;
        dd.message.user.user.icon = dd.message.user.user.icon || 'f9bafc1e9eab04863fb7d42fa3a3f457.t80x80.fc.s0x-2xdddddd';
        d.author = {
            loginname: dd.message.user.user.name,
            avatar_url: 'http://as.named.cn/f/' + (dd.message.user.user.icon.crop || dd.message.user.user.icon) + '.png'
        };
        return d;
    });

    let rs = {
        site: 'cnode-bbs',
        data
    };
    return rs;
}

export function topicModelTransform(data) {
    "use strict";
    let rs = {
        site: 'cnode-bbs',
        data
    };
    return rs;
}
