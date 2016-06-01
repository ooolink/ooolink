/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const consumer = require('fibms-node-client').Consumer();
const producer = require('fibms-node-client').Producer();
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

/** 远程调用 **/
export const incContentCommentNumber = function (contentid){
    let message = producer.createMessage('global_content_incCommentNumber');
    message.setType(producer.MESSAGE_GROUP);
    message.setParams('contentid', contentid);
    producer.sendMessage(message);
    return true;
}

export const decContentCommentNumber = function (contentid){
    let message = producer.createMessage('global_content_decCommentNumber');
    message.setType(producer.MESSAGE_GROUP);
    message.setParams('contentid', contentid);
    producer.sendMessage(message);
    return true;
}