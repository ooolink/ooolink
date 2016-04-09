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
        site: 'named-bbs',
        data
    };
    return rs;
}

export function topicModelTransform(data) {
    "use strict";
    let dd = data.message;
    dd.message.user.user.icon = dd.message.user.user.icon || 'f9bafc1e9eab04863fb7d42fa3a3f457.t80x80.fc.s0x-2xdddddd';
    let resultData = {
        id: dd.message.id,
        author_id: dd.message.user.user.id,
        tab: '',
        content: dd.message.content,
        title: dd.message.title,
        reply_content: dd.comments.comment,
        visit_count: 0,
        create_at: dd.message.created,
        author: {
            loginname: dd.message.user.user.name,
            avatar_url: 'http://as.named.cn/f/' + (dd.message.user.user.icon.crop || dd.message.user.user.icon) + '.png'
        },
        replies: []
    };
    data = data.message.comments.list;
    data.forEach((item)=> {
        let d = {};
        let dd = item.data;
        d.id = dd.message.msgid;
        d.content = dd.message.content;
        d.create_at = dd.message.created;
        dd.message.user.user.icon = dd.message.user.user.icon || 'f9bafc1e9eab04863fb7d42fa3a3f457.t80x80.fc.s0x-2xdddddd';
        d.author = {
            loginname: dd.message.user.user.name,
            avatar_url: 'http://as.named.cn/f/' + (dd.message.user.user.icon.crop || dd.message.user.user.icon) + '.png'
        };
        resultData.replies.push(d);
    });
    let rs = {
        site: 'cnode-bbs',
        data: resultData
    };
    return rs;
}
