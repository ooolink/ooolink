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
import log from './log';
import content from './services/content'
import site from './services/site'
import recommend from './services/recommend'
import sea from './indexes/sea'
require('./tasks/sites/cnode');
require('./tasks/commons/rss');

let message;
// message = producer.createMessage('ss_task_getSiteAllContents_cnode');
// message.setParams('site',{site_id:'04be9c7c2e7f7eda6febba12aa579a8d'});
// producer.sendMessage(message);

// message = producer.createMessage('ss_task_getSiteAllContents_rss');
// message.setParams('site',{site_id:'5bd4fe16d03f4b7e88f68f8381dce1eb'});
// producer.sendMessage(message);

/** services **/
content(consumer);
site(consumer);
recommend(consumer);

/** indexes **/
sea(consumer);
