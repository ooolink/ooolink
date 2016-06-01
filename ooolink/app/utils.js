/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React,{
    Dimensions,
} from 'react-native';

let {height, width} = Dimensions.get('window');

export function computeThemeBlockHeight(themes) {
    "use strict";
    let row = 1, widthLeft = width - 10;
    themes.forEach(theme=> {
        let l = (theme.length * 12 + 10);
        if (widthLeft < l) {
            row++;
            widthLeft = width - 10 - l;
        } else {
            widthLeft -= l
        }
    });
    return row * 20;
}

export function UriDeal(uri) {
    "use strict";

    if (!uri || uri.substr(uri.length - 3) === 'gif'){
        return null;
    }

    if (typeof uri === 'string' && uri.substr(0, 2) === '//') {
        return `https:${uri}`;
    }

    return uri;
}

export function WordLineDeal(title, width, px, line) {
    "use strict";
    let lineNumber = parseInt(width / (px / 2)), l = 0, r = 0;

    for (let idx = 0; idx < title.length; idx++) {
        let rs = title.charCodeAt(idx) > 255,
            w = rs ? 2 : 1;
        if (r + 1 == line) {
            if (l + 3 + w > lineNumber) {
                return title.substr(0, idx - 1) + '...';
            } else if (l + 3 + w === lineNumber) {
                let q = idx === title.length - 1 ? '' : '...';
                return title.substr(0, idx) + q;
            } else {
                l += w;
            }
        } else {
            if (l + w > lineNumber) {
                l = 0;
                r++;
            } else {
                l += w;
            }
        }
    }
    return title;
}

export function timeDeal(time, type) {
    "use strict";

    function ago(time) {
        let t = new Date() - new Date(time), tm = [], tms = ['年', '个月', '天', '小时', '分钟', '秒'];
        tm[0] = t / (365 * 24 * 3600 * 1000);
        tm[1] = t / (30 * 24 * 3600 * 1000);
        tm[2] = t / (24 * 3600 * 1000);
        tm[3] = t / (3600 * 1000);
        tm[4] = t / (60 * 1000);
        tm[5] = t / 1000;
        for (let i = 0, len = tm.length; i < len; i++) {
            if (tm[i] >= 1) {
                return parseInt(tm[i]) + tms[i] + '前';
            }
        }
        return t + '毫秒前';
    }

    function read(time){
        if (time < 30){
            return '半分钟';
        } else if (time < 60){
            return ' ' + 1 + ' 分钟';
        } else {
            let t = (time / 60 + 1).toFixed(0);
            return ' ' + t + ' 分钟';
        }
    }

    switch (type) {
        case 'ago':
            return ago(time);
        case 'read':
            return read(time);
        default:
            return ago(time);
    }
}

export function numberDeal(number, type) {
    if (!number){
        return 0;
    }
    function general(number){
        if (number >= 1000 && number < 10000){
            return (number / 1000).toFixed(0) + 'k+';
        } else if (number >= 10000 && number < 100000) {
            return (number / 10000).toFixed(0) + 'w+';
        } else if (number >= 100000 && number < 1000000){
            return (number / 10000).toFixed(0) + 'w';
        } else if (number >= 1000000 && number < 10000000){
            return (number / 1000000).toFixed(0) + 'm+';
        } else if (number >= 10000000 && number < 100000000){
            return (number / 1000000).toFixed(0) + 'm';
        } else if (number >= 100000000){
            return (number / 100000000).toFixed(0) + 'b+';
        }
        return number;
    }

    switch (type){
        case 'general':
            return general(number);
        default:
            return general(number);
    }
}







