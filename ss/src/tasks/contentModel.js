/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
 const model = {
 	content_id: '',
 	site_id: '',
 	title: '',
 	desc: '',
 	content: '',
    image: '',
 	theme: [],
 	created: null,
 	updated: null,
 	url: '',
 	classes: {
 		normal_class: [],
 		detail_class: [],
 		specific_class: [],
 		keyword: []
 	},
 	author: {
 		author_id: '',
 		author_loginname: '',
 		author_name: '',
 		author_avatar: ''
 	},
 	comments:[],
 	quantity:{
 		content_status: 2,
 		view_count: 0,
 		comment_count: 0,
 		view_avetime: 0,
        view_avetime_general: 0,
 		class_accuracy: 0,
 		content_quantity: 0,
 		timeliness: 0
 	}
 }

 export default function(){
 	return Object.assign({}, model);
 };