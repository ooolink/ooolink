/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
var textSearch = require('mongoose-text-search');
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let searchIndexScheme = new Schema({
    content_id: {type: String, index: {unique: true}},
    title: {type: String},
    desc: {type: String},
    content: {type: String},
    keywords: [String],
    keywordsWeight: [Number],
    forSearch: [String] 
});

searchIndexScheme.plugin(textSearch);
searchIndexScheme.index({title: 'text', desc: 'text', keywords: 'text', forSearch: 'text'});                 //暂时只支持 title 和 desc 的索引  2016.6.4

mongoose.model('searchIndex', searchIndexScheme);

