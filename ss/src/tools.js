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

export function getDescFromContent(content){

    try{
        let $ = cheerio.load(content);
        let rs = '',
            lastDesc = ''

        for (let i = 0; i < 10; i++){
            let desc = $($('p').get(i)).text();
            //处理纯文字的情况
            if (i === 0 && !desc){
                return {
                    contentType: 'text',
                    desc: content.substr(0, 200)
                }
            }

            if (desc){
                rs+=desc;
            }

            if (rs.length > 200){
                let spl = rs.length > 300 || rs.length - lastDesc.length < 100 ? 200 : rs.length - lastDesc.length,
                    rs_desc = rs.substr(0, spl);
                return {
                    contentType: 'html',
                    desc: rs_desc
                };
            }
        }
        return {
            contentType: 'html',
            desc: rs
        };
    } catch (e){
        //处理纯文字的情况
        return {
            contentType: 'text',
            desc: content.substr(0, 200)
        }
    }
}