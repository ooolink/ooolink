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
const less = require('gulp-less');
const minifycss = require('gulp-minify-css');
const concat = require('gulp-concat');
const webpack = require('gulp-webpack');

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
    return gulp.src('server/public/css/**/*.css')
        .pipe(less())
        .pipe(concat('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('server/public/dist'));
});

gulp.task('js', ()=> {
    "use strict";
    return gulp.src(['server/public/js/**/*.js', 'server/public/js/**/*.vue'])
        .pipe(webpack(require('./webpack.base.config.js')))
        .pipe(gulp.dest('server/public/dist/'));
});

//ss
gulp.task('move-ss', ()=>{
    return gulp.src('ss/src/views/pages/**/*.*', {base: './ss/src'})
        .pipe(gulp.dest('./ss/dist'));
});

gulp.task('babel-ss', ()=>{
    return gulp.src(['ss/src/**/*.js'], {base: './ss/src'})
        .pipe(changed('./ss/dist'))
        .pipe(babel({
            presets: ['nodejs-lts']
        }))
        .pipe(gulp.dest('./ss/dist'));
});

gulp.task('ss', ['babel-ss', 'move-ss'], ()=> {
    nodemon({
        watch: ['./ss'],
        script: 'ss/dist/app.js',
        ignore: ['dist/**/*.js', 'server/dist/**/*.js', '.git', '.idea', '.DS_Store', 'server/src/default/nodeclub'],
        ext: '.js,.ejs',
        env: {'NODE_ENV': 'dev'},
        tasks: ['babel-ss'],
        cwd: __dirname
    });
});

gulp.task('server', ['babel', 'css', 'js'], ()=> {
    nodemon({
        watch: ['./server'],
        script: 'server/dist/index.js',
        ignore: ['dist/**/*.js', '.git', '.idea', '.DS_Store', 'src/default/nodeclub'],
        ext: '.js,.ejs',
        env: {'NODE_ENV': 'dev'},
        tasks: ['babel'],
        cwd: __dirname
    });

    gulp.watch('server/public/css/**/*.css', ['css']);
    gulp.watch('server/public/js/**/*.js', ['js']);
    gulp.watch('server/public/js/vue/**/*.vue', ['js']);
});
