/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
module.exports = {
    entry: './server/public/js/main.js',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            vue: "./bower_components/vue/dist/vue.js"
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['nodejs-lts']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    }
};