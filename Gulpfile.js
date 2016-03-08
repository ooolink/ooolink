/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const babel = require('gulp-babel');
const changed = require('gulp-changed');

//Server
gulp.task('babel', ()=> {
    return gulp.src(['server/src/**/*.js'], {base: './server/src'})
        .pipe(changed('./server/dist'))
        .pipe(babel({
            presets: ['nodejs-lts']
        }))
        .pipe(gulp.dest('./server/dist'));
});

gulp.task('server', ['babel'], ()=> {
    nodemon({
        watch: ['./'],
        script: 'server/dist/index.js',
        ignore: ['server/dist/**/*.js', '.git', '.idea', '.DS_Store', 'ooolink/app'],
        ext: '.js',
        env: {'NODE_ENV': 'dev'},
        tasks: ['babel'],
        cwd: __dirname
    });
});
