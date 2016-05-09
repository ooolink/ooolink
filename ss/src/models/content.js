/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let classSchema = new Schema({
	normal_class: Array,
	detail_class: Array,
	specific_class: Array,
	keyword: Array
});

let authorSchema = new Schema({
	author_id: String,
	author_loginname: String,
	author_name: String,
	author_avatar: String
});

let commentSchema = new Schema({
	comment_content: String,
	comment_created: {type: Date, default: Date.now},
	comment_author: authorSchema
});

let quantitySchema = new Schema({
	content_status: {type: Number, default: 2},    //online dealing review destroy
	view_count: {type: Number, default: 0},
	comment_count: {type: Number, default: 0},
	view_avetime: {type: Number, default: 0},
	view_avetime_general: {type: Number, default: 0},
	class_accuracy: {type: Number, default: 0},
	content_quantity: {type: Number, default: 0},
	timeliness: {type: Number, default: 0}
});

let contentSchema = new Schema({
	content_id: {type: String, index: { unique: true }},
	site_id: String,
	title: String,
	image: String,
	desc: String,
	content: String,
	theme: Array,
	created: {type: Date, default: Date.now},
	updated: {type: Date, default: Date.now},
	url: String,
	classes: classSchema,
	author: authorSchema,
	comments: [commentSchema],
	quantity: quantitySchema
});

const as = '0123456789abcdefghijklmnopqrstuvwxyz';

for (let i = 0,len = as.length; i < len; i++){
	for (let j = 0,len = as.length; j < len; j++){
		mongoose.model(`${as[i]}${as[j]}_content`, contentSchema);
	}
}

//TODO 加updated 等的索引
















