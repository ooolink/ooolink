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