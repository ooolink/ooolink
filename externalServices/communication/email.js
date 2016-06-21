/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const consumer = require('fibms-node-client').Consumer();
const producer = require('fibms-node-client').Producer();
const nodemailer = require('nodemailer');
const smtpConfig = {
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: '353371737@qq.com',
        pass: 'kreqqlfkxsbdbiac'
    }
};
var transporter = nodemailer.createTransport(smtpConfig);

consumer.onMessage('ext_mail_sendMail', params=>{
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Fred Foo 👥" <353371737@qq.com>', // sender address
        to: '353371737@qq.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world 🐴', // plaintext body
        html: '<b>Hello world 🐴</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});