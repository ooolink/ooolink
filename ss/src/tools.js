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
            lastDesc = '',
            clen = content.length;

        for (let i = 0; i < 10; i++){
            let desc = $($('p').get(i)).text();
            let html = $($('p').get(i)).html();
            //处理纯文字的情况
            if (i === 0 && !desc && !html){
                return {
                    contentType: 'text',
                    desc: content.substr(0, 200) + (clen > 200 ? '...' : '')
                }
            }

            if (desc){
                rs+=desc;
            }

            let rlen = rs.length,
                llen = lastDesc.length;

            if (rlen > 200){
                let spl = rlen > 300 || rlen - llen < 100 ? 200 : rlen - llen,
                    rs_desc = rs.substr(0, spl);
                return {
                    contentType: 'html',
                    desc: rs_desc + (rlen > 300 || rlen - llen < 100 ? '...' : '' )
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
            desc: content.substr(0, 200) + (clen > 200 ? '...' : '')
        }
    }
}