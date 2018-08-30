var gulp = require('gulp'),
    del = require('del'),
    copy = require('copy'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    concatCSS = require('gulp-concat-css'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    htmlreplace = require('gulp-html-replace');

gulp.task('clean', function () {
    del(['dest/*']);
});

gulp.task('copy', function (cb) {
    copy(['favicon.ico'], 'dest/', cb);
});

gulp.task('uglifyjs', function () {
    gulp.src(['js/*.js'])
        .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dest/js/'));
})

gulp.task('cssmin', function () {
    gulp.src(['css/*.css'])
        .pipe(concatCSS('main.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dest/css'))
});

gulp.task('imagemin', function () {
    gulp.src(['images/**/*.{png,jpg,jpeg}'])
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dest/images'))
});

gulp.task('htmlmin', function () {
    gulp.src(['index.html'])
        .pipe(htmlreplace({
            'css': 'css/main.css',
            'js': 'js/main.js'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseBooleanAttributes: false,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyCSS: true,
            minifyJS: true,
        }))
        .pipe(gulp.dest('dest/'))
})

gulp.task('default', ['clean'], function () {
    gulp.start('copy', 'uglifyjs', 'cssmin', 'imagemin', 'htmlmin');
});