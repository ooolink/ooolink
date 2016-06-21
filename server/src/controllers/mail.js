/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";
const producer = require('fibms-node-client').Producer();

export const sendMail = function *(next){
    let message = producer.createMessage('ext_mail_sendMail');
    producer.sendMessage(message);
    this.body = {result: 1};
}