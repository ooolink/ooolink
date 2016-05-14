/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import cheerio from 'cheerio'
export function getImageFromContent(content){
    let $ = cheerio.load(content);
    let firstImage = $('img').get(0);
    if (firstImage) {
        return firstImage.attribs.src;
    } else {
        return '';
    }
}