/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import BaseController from '../../controller';
import request from 'request';
import {topicsModelTransform, topicModelTransform} from './model';

class NamedController extends BaseController {
    static getThemes = function *() {
        this.body = NamedController.themes;
    };

    static getTheme = function *() {

        var options = {
            url: 'http://i.named.cn/rest/object/get.' + encodeURIComponent(this.params.id) + '.bbs'
        };

        yield new Promise((resolve, reject)=> {

            request.get(options, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        }).then((data)=> {
            this.body = topicsModelTransform(JSON.parse(data.substr(7, data.length - 9)));
        }, (error)=> {
            this.body = 'Origin Error';
            this.status = 500;
        });
    };

    static getTopic = function *() {

        let COMMENTS_URL = 'http://i.named.cn/rest/' + encodeURIComponent(this.params.id) + '/comments/list.comment..0',
            TOPIC_URL = 'http://i.named.cn/rest/object/get.' + encodeURIComponent(this.params.id) + '.default';
        var options = {
            url: TOPIC_URL
        };

        yield new Promise((resolve, reject)=> {

            request.get(options, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        }).then((data)=> {
            this.body = topicModelTransform(JSON.parse(data.substr(7, data.length - 9)));
        }, (error)=> {
            this.body = 'Origin Error';
            this.status = 500;
        });
    };

    static getSiteConf = function *() {
        this.body = {
            themes: NamedController.themes,
            conf: {
                fn: []
            },
            desc: '一个好玩的娱乐线上社区',
            title: '那么社区',
            image: 'http://as.named.cn/f/5ff9062b936cbbdcf8104cc1337ee171.c0x0x298x180.t160x160.jpg'
        }
    };

    static themes = [
        'fibjs', '那么一起玩', '美丽秘密', '江南水乡', '我来818', '硬腿子'
    ]
}

export default NamedController;