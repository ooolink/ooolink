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
            if (parseInt(tm[i]) != 0) {
                return parseInt(tm[i]) + tms[i] + '前';
            }
        }
        return t + '毫秒前';
    }

    switch (type) {
        case 'ago':
            return ago(time);
        default:
            return ago(time);
    }
}