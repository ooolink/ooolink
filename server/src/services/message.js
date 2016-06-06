/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
 import Message from '../models/message';

 export const getMessages = function *(query){
    let rs = yield Message.findAll(query);
    return rs;
 }
