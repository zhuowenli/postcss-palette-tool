/*
 * @Author: 卓文理
 * @Email: zhuowenligg@gmail.com
 * @Date: 2019-11-04 10:26:32
 */

const { src, dest, parallel, watch } = require('gulp');
const postcss = require('gulp-postcss');
const webserver = require('gulp-webserver');
const plugin = require('./src');

function css() {
    return src('test/color/input.css')
        .pipe(postcss([plugin()]))
        .pipe(dest('dist'));
}

function server() {
    return src('.')
        .pipe(webserver({
            livereload: true,
            open: true,
            fallback: 'index.html',
        }));
}

watch(['src/*.js', 'index.html', 'test/**/*.css'], parallel(css));

exports.default = parallel(css, server);
