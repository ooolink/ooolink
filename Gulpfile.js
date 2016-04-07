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
const minifycss = require('gulp-minify-css');
const concat = require('gulp-concat');

//Server
gulp.task('babel', ()=> {
    return gulp.src(['!server/src/default/nodeclub/**/*.*', 'server/src/**/*.js'], {base: './server/src'})
        .pipe(changed('./server/dist'))
        .pipe(babel({
            presets: ['nodejs-lts']
        }))
        .pipe(gulp.dest('./server/dist'));
});

gulp.task('css', ()=> {
    "use strict";
    return gulp.src('server/public/css/*.css')
        .pipe(concat('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('server/public/dist'));
});

gulp.task('server', ['babel', 'css'], ()=> {
    nodemon({
        watch: ['./'],
        script: 'server/dist/index.js',
        ignore: ['server/dist/**/*.js', '.git', '.idea', '.DS_Store', 'ooolink/app', 'server/src/default/nodeclub'],
        ext: '.js,.ejs',
        env: {'NODE_ENV': 'dev'},
        tasks: ['babel'],
        cwd: __dirname
    });

    gulp.watch('server/public/css/*.css', ['css']);
});
