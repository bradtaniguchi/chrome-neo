/*
* Bradley Taniguchi
* 2/7/17
* Gulp build file
* For chrome-neo extension for Senior Project at CSUDH
* CSC 492
*/

var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var wrap = require('gulp-wrap');

//gutil.log('stuff happened?', 'for realz', gutil.colors.magenta('123'));
var wrapper = '(function(){\n"use strict";<%= contents %>\n})();';
/*default task*/
gulp.task('default', function() {
  return gutil.log('Gulp is running!');
});

/*Move html files from angular app to dist.
 *keep file structure*/
gulp.task('copyHtml', function() {
  gulp.src('./app/**/*.html', {base: './app/'})
  .pipe(gulp.dest('dist/'));
});

/*move static files to base dir*/
gulp.task('moveStatic', function() {
  gulp.src('manifest.json')
  .pipe(gulp.dest('dist'));
  /*Move the background files*/
  gulp.src('./js/*.js')
  .pipe(gulp.dest('dist/js/'));
  /*Move any png images*/
  gulp.src('./img/*.png')
  .pipe(gulp.dest('dist/img/'));
  /*Move angularjs file*/
  gulp.src('./bower_components/**')
  .pipe(gulp.dest('dist/bower_components/'));
});

/*Clean the dist folder*/
gulp.task('clean', function() {
  gutil.log("Remove dist folder..");
  return gulp.src('dist', {read: false}).pipe(clean());
});

/*Linting task*/
gulp.task('jshint', function() {
  return gulp.src('./app/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

/*Build the js files, and */
gulp.task('buildjs', function() {
  gutil.log(gutil.colors.magenta('building js files...'));
  return gulp.src(['./app/app.module.js', './app/**/*.js'], {base: './app/'})
  .pipe(concat('app.js'))
  .pipe(wrap(wrapper))
  .pipe(gulp.dest('dist'))
  /*minify the file*/
  .pipe(rename('app.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

/*watch these files*/
gulp.task('watch', function() {
  gutil.log(gutil.colors.magenta('watching files...'));
  gulp.watch('./app/**/*.js', ['jshint', 'buildjs']);
  gulp.watch('manifest.json', ['moveStatic']);
  gulp.watch('./app/**/*.html', ['copyHtml']);
});

/*Default task*/
gulp.task('default', ['jshint', 'copyHtml', 'moveStatic', 'buildjs', 'watch']);

/*Same as the default task, but no watch*/
gulp.task('build', ['jshint', 'copyHtml', 'moveStatic', 'buildjs']);
