/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import BaseController from '../../controller';
import {topicsModelTransform, topicModelTransform} from './model';
import request from 'request';

class CnodeController extends BaseController {
    static getThemes = function *() {
        this.body = CnodeController.themes;
    };

    static getTheme = function *() {

        let page = this.query.page || 0, limit = this.query.limit || 10;
        let options = {
            url: `https://cnodejs.org/api/v1/topics?page=${page}&limit=${limit}&tab=` + CnodeController.themesMap[this.params.id]
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
            this.body = topicsModelTransform(JSON.parse(data).data);
        }, (error)=> {
            this.body = 'Origin Error';
            this.status = 500;
        });
    };

    static getTopic = function *() {

        let topicId = this.params.id;
        let options = {
            url: `https://cnodejs.org/api/v1/topic/${topicId}`
        };

        yield new Promise((resolve, reject)=> {

            request.get(options, (error, response, body)=> {
                if (!error && response.statusCode === 200) {
                    resolve(body);
                } else {
                    reject(error);
                }
            });
        }).then((data) => {
            this.body = topicModelTransform(JSON.parse(data).data);
        }, (error) => {
            this.body = 'Origin Error';
            this.status = 500;
        });
    };

    static getSiteConf = function *() {
        this.body = {
            themes: CnodeController.themes,
            conf: {
                fn: []
            }
        }
    };

    static themes = [
        '首页', '精华', '分享', '问答', '招聘'
    ];

    static themesMap = {
        "首页": '',
        "精华": 'good',
        '分享': 'share',
        '问答': 'ask',
        '招聘': 'job'
    }
}

export default CnodeController;