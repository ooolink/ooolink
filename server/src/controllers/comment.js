/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";
import * as commentService from '../services/comment';
import * as userService from '../services/user';

export const publishComment = function *(next){
    let {content, contentid, replyid} = this.request.body.fields;
    let comment = yield commentService.addComment(content, replyid, contentid, this._domain.user.id);
    commentService.incContentCommentNumber(contentid);
    this.body = {
        result: 1,
        data: comment.id
    }
}

export const getComments = function *(next){
    let {page, limit} = this.query,
        contentid = this.params.contentid;

    page = parseInt(page);
    limit = parseInt(limit);
    limit = limit > 10 ? 10 : limit;
    
    let comments = yield commentService.getComments(contentid, page, limit);
    let count = comments.count,
        rows = comments.rows;

    let ids = rows.map(comment=>{
        return comment.user_id;
    });

    let map = {}; 
    let userInfos = yield userService.getUserInfo(ids);
    userInfos.forEach(userInfo=>{
        map[userInfo.user_id] = userInfo;
    });

    let commentsRs = rows.map(comment=>{
        let commentRs = comment.dataValues;
        commentRs['userInfo'] = map[comment.user_id];
        return commentRs;
    });

    this.body = {
        result: 1,
        data: {
            count,
            rows: commentsRs
        }
    }
}