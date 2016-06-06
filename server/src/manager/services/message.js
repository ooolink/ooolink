/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const Message = require('../models/message');

export const setMessage = function *(message_type, message_origin, message_from, message_to, message_title, message_content){
    let rs = yield Message.create({message_type, message_origin, message_from, message_to, message_title, message_content});
    return rs;
}

export const getMessage = function *(query){
    let rs = yield Message.findAll(query);
    return rs;
}