var gulp = require('gulp'),
    gutil = require('gulp-util'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    minifyHtml = require('gulp-minify-html'),
    rev = require('gulp-rev'),
    concat = require('gulp-concat'),
    opn = require('opn'),
    del = require('del');

gulp.task('views', function () {
    return gulp.src('src/views/**/*.html')
        .pipe(minifyHtml({empty: true}))
        .pipe(gulp.dest('dist/views'));
});

gulp.task('usemin', function() {

    return gulp.src('src/*.html')
        .pipe(usemin({
            css: [minifyCss({
                advanced: false
            }), 'concat'],
            html: [minifyHtml({empty: true})],
//            js: [uglify(), rev()],
            js: [uglify()],
            inlinejs: [uglify()],
            inlinecss: [minifyCss(), 'concat'],
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('reload', function () {
  return gulp.src('src/**/**.*')
    .pipe(connect.reload());
});

gulp.task('connect', function (done) {
  connect.server({
    root: 'src',
    port: 8000,
    livereload: true
  });
  opn('http://localhost:8000', done);
});

gulp.task('watch', function () {
  gulp.watch('src/**/**.*', ['reload']);
});

gulp.task('clean', function (cb) {
    del(['dist'], cb);
});

gulp.task('serve', ['connect', 'watch']);
gulp.task('build', ['usemin', 'images', 'fonts', 'views']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
