/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import mongoose from 'mongoose'
require('./site');
require('./content');
const config = require('../../config.json');

mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    process.exit(1);
  } else {
  	console.log('mongodb %s connect success', config.db)
  }
});

exports.Site = mongoose.model('Site');
exports.Content = (as)=>{
	return mongoose.model(`${as}_content`);
}
