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

    static themes = [
        'fibjs', '那么一起玩', '美丽秘密', '江南水乡', '我来818', '硬腿子'
    ]
}

export default NamedController;