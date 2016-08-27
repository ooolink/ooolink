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
import search from './services/search'

//启动后台管理
import adminApp from './adminApp'
if (process.env.SS_ADMIN_RUN && process.env.SS_ADMIN_RUN === 'CALL'){
	adminApp();
}

require('./tasks/sites/cnode');
require('./tasks/commons/rss');

let message;
// message = producer.createMessage('ss_task_getSiteAllContents_cnode');
// message.setParams('site',{site_id:'04be9c7c2e7f7eda6febba12aa579a8d'});
// producer.sendMessage(message);

// message = producer.createMessage('ss_task_getSiteAllContents_rss');
// message.setParams('site',{site_id:'5bd4fe16d03f4b7e88f68f8381dce1eb'});
// producer.sendMessage(message);

// message = producer.createMessage('ss_task_getSiteAllContents_rss');
// message.setParams('site',{site_id:'96030d6e62c8c9641968a9e1c6216cf8'});
// producer.sendMessage(message);

// message = producer.createMessage('ss_task_getSiteAllContents_rss');
// message.setParams('site',{site_id:'2861ef36d18b0c71c8ba6ffe01980f93'});
// producer.sendMessage(message);

// message = producer.createMessage('ss_task_getSiteAllContents_rss');
// message.setParams('site',{site_id:"f1b027414a528744f6daea2597e29d6b"});
// producer.sendMessage(message);

// message = producer.createMessage('ss_task_getSiteAllContents_rss');
// message.setParams('site',{site_id:"2ccc2ae81f8c583fc756ce7a72f4ae0d"});
// producer.sendMessage(message);

/** services **/
content(consumer);
site(consumer);
recommend(consumer);
search(consumer);

/** indexes **/
sea(consumer);