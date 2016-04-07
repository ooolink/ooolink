/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import FeedParser from 'feedParser';
import request from 'request';
import BaseController from '../../controller';
import {topicsModelTransform} from './model';

class LSController extends BaseController {

    static getThemes = function *() {
        this.body = LSController.themes;
    };

    static getTheme = function *() {
        let url = 'http://www.linuxstory.org/feed';

        yield new Promise((resolve, reject)=> {
            let data = [];
            request(url)
                .pipe(new FeedParser())
                .on('error', function(error) {
                    reject(error);
                })
                .on('meta', function(meta) {
                })
                .on('data', function(d) {
                    data.push(d);
                })
                .on('end', function() {
                    data = topicsModelTransform(data);
                    resolve(data);
                });
        }).then(data=> {
            this.body = data;
        }, error=> {
            console.log(error);
            this.body = 'Origin Error';
            this.status = 500;
        });
    };

    static getSiteConf = function *() {
        this.body = {
            themes: LSController.themes,
            conf: {
                fn: []
            },
            desc:'一个有情有意的 Linux 社区',
            title:'LinuxStory'
        }
    };

    static themes = [
        '首页',
        'Linuxstory快资讯'
    ]
}

export default LSController;