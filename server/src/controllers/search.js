/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";
import * as searchService from '../services/search';
import {blankAuth} from '../tools/auth';

const hot = function *(){
	this.body = yield searchService.searchHot();
}

const near = function *(){

}

const recommend = function *(){

}

const keyword = function *(){
	let {content, page, limit} = this.request.body.fields;

	page = parseInt(page);
	limit = parseInt(limit);

	let contents = yield searchService.searchKeyword(content, page, limit);
	this.body = {
		result: 1,
		data: contents
	}
}

const site = function *(){
	
	let rs = yield blankAuth(null, ['v']).call(this);
	if (rs === true){
		this.body = yield searchService.searchSites(this.request.fields.v);
	}
}

const funcMap = {hot, near, recommend, keyword, site};

export const searchEntrance = function *(next){

	let type = this.request.body.fields.type;
	if (!funcMap[type]){
		throw new Error('search paramsError 500');
	}

	yield funcMap[type].call(this);
}

export const getSearchHot = function *(next){

	let hots = ['前端工程师招聘', '创新创业', '网红', '阿里巴巴集团', 'nodejs living' ,
				'Uber融资', '嘀嘀打车', '百度云', 'nodeclub', '蚂蚁金服', 
				'中文线上社区', 'github开源', '七牛', 'NBA', '阿里巴巴实习生招聘'];
	let start = Math.round(Math.random() * 10);
	this.body = {
		result: 1,
		data: hots.slice(start, start + 5)
	}
}









