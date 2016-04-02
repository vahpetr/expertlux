/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  concat = require("gulp-concat"),
  cssmin = require("gulp-cssmin"),
  uglify = require("gulp-uglify"),
  fs = require('fs'),
  shell = require('gulp-shell')
  
var project = JSON.parse(fs.readFileSync('./project.json'));

var webroot = "./wwwroot/";
var content = "./Content/";
var styles = "./Styles/";
var scripts = "./Scripts/";
var webconfig = "./web.config";

var paths = {
  content: content + "**/*.*",
  contentDest: webroot,
  contentJs: content + "css/**/*.css",
  contentJsDest: webroot + "css/",
  webconfig: webconfig,
  webconfigDest: webroot,
  jsFolder: webroot + "js/",
  js: webroot + "js/**/*.js",
  minJs: webroot + "js/**/*.min.js",
  cssFolder: webroot + "css/",
  css: webroot + "css/**/*.css",
  minCss: webroot + "css/**/*.min.css",
  concatJsDest: webroot + "app.js",
  concatCssDest: webroot + "styles.css"
};

gulp.task("clean", function(cb){
    rimraf(webroot, cb);
});

gulp.task("clean:js:folder", function (cb) {
  rimraf(paths.jsFolder, cb);
});

gulp.task("clean:css:folder", function (cb) {
  rimraf(paths.cssFolder, cb);
});

gulp.task("clean:folder", ["clean:js:folder", "clean:css:folder"]);

gulp.task("min:js", function () {
  return gulp.src([paths.js, "!" + paths.minJs], {
    base: "."
  })
    .pipe(concat(paths.concatJsDest))
    .pipe(uglify())
    .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
  return gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});

gulp.task('prepare:content', function () {
  return gulp.src(paths.content)
    .pipe(gulp.dest(paths.contentDest));
});

gulp.task('prepare:webconfig', function () {
  return gulp.src(paths.webconfig)
    .pipe(gulp.dest(paths.webconfigDest));
});

gulp.task('css:prepare', function () {
  return gulp.src(paths.contentJs)
    .pipe(gulp.dest(paths.contentJsDest));
});

gulp.task('prepare', ['prepare:content', 'prepare:webconfig']);

gulp.task("min", ["min:js", "min:css"]);
gulp.task("build", ["css:prepare"], function () {
  return gulp.src([paths.css, "!" + paths.minCss])
    .pipe(concat(paths.concatCssDest))
    .pipe(cssmin())
    .pipe(gulp.dest("."));
});//alias

gulp.task('prepublish', shell.task(project.scripts.prepublish))
//gulp.task('postpublish', shell.task(project.scripts.postpublish))
//gulp.task('publish', ['prepublish', 'postpublish'])
