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
}

export default NamedController;