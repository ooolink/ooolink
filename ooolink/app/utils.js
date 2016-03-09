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