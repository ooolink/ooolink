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
	let word = this.request.body.fields.content;
	let contents = yield searchService.searchKeyword(word);
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