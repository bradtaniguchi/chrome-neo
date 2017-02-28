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
var title='/*\n';
title +=' * Bradley Taniguchi\n';
title +=' * 2/27/2017\n';
title +=' * chrome-neo\n'; 
title +=' * */\n';
title +='<%= contents %>';

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
  gutil.log(gutil.colors.magenta("Moving manifest"));
  gulp.src('manifest.json')
  .pipe(gulp.dest('dist'));

  gutil.log(gutil.colors.magenta("Moving css files"));
  /*Move the css files*/
  gulp.src([
    './bower_components/angular-material/angular-material.css',
    './bower_components/animate.css/animate.css/'
  ])
  .pipe(gulp.dest('dist/css'));

  /*Move any png images*/
  gutil.log(gutil.colors.magenta("Moving png files"));
  gulp.src('./img/*.png')
  .pipe(gulp.dest('dist/img/'));
  /*Move angularjs file*/
  /*gulp.src('./bower_components/**')
  .pipe(gulp.dest('dist/bower_components/'));*/
  gutil.log(gutil.colors.magenta("Moving static files to lib"));
  gulp.src([
    './bower_components/angular/angular.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js',
    './bower_components/angular-material/angular-material.js',
    './bower_components/chart.js/dist/Chart.bundle.js',
    './bower_components/angular-chart.js/dist/angular-chart.js',
    './bower_components/angular-animate/angular-animate.js',
    './bower_components/angular-aria/angular-aria.js',
    './bower_components/angular-messages/angular-messages.js',
    './bower_components/moment/moment.js',
    './bower_components/angular-moment/angular-moment.js',
    './bower_components/localforage/dist/localforage.js',
    './bower_components/angular-localforage/dist/angular-localForage.js'
  ])
  .pipe(gulp.dest('dist/lib/'));
});

/*Clean the dist folder*/
gulp.task('clean', function() {
  gutil.log("Removing dist folder..");
  return gulp.src('dist', {read: false}).pipe(clean());
});

/*Linting task*/
gulp.task('jshint', function() {
  gutil.log(gutil.colors.magenta('Linting...'));
  return gulp.src('./app/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

/*Build the js files, and */
gulp.task('buildjs', function() {
  gutil.log(gutil.colors.magenta('building js files...'));
  return gulp.src(['./app/app.module.js', './app/**/*.js'], {base: './app/'})
  .pipe(concat('app.js'))
  .pipe(wrap(wrapper)) //apply the self-executing function
  .pipe(gulp.dest('dist'))
  /*minify the file*/
  .pipe(rename('app.min.js'))
  .pipe(uglify())
  .pipe(wrap(title))
  .pipe(gulp.dest('dist'));
});

/*watch these files*/
gulp.task('watch', function() {
  gutil.log(gutil.colors.magenta('watching js files...'));
  gutil.log(gutil.colors.magenta('watching files...'));
  gulp.watch('./app/**/*.js', ['jshint', 'buildjs']);
  gulp.watch('manifest.json', ['moveStatic']);
  gulp.watch('./app/**/*.html', ['copyHtml']);
});

/*Default task*/
gulp.task('default', ['jshint', 'copyHtml', 'moveStatic', 'buildjs', 'watch']);

/*Same as the default task, but no watch*/
gulp.task('build', ['jshint', 'copyHtml', 'moveStatic', 'buildjs']);
