/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
 import Comment from '../models/comment';

 export const addComment = function *(content, reply_id, content_id, user_id){
    let comment = yield Comment.create({
        content,
        reply_id,
        content_id,
        user_id
    })

    return comment;
 }

 export const getComments = function *(content_id, page, limit){
    let comments = yield Comment.findAndCountAll({
        where: {
            content_id
        },
        plain: false,
        limit,
        offset: page * limit,
        order: 'created DESC'
    });

    return comments;
 }