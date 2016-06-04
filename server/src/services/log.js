/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";

export default function *(next){
	try{
		yield next;
	} catch (e){
                //throw e;
                this.body = {result: 0};
                if (typeof e.message === 'string'){
                        let msgArr = e.message.split(' ');
                        this.status = parseInt(msgArr[2]) || 500;   
                        console.log(e.stack);
                        console.log('----------------------------------');
                } else {
                        console.log(e);
                }
	}
}