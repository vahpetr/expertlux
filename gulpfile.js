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
var content = "./content/";
var styles = "./styles/";
var scripts = "./scripts/";
var webconfig = "./web.config";

var paths = {
  content: content + "**/*.*",
  contentDest: webroot,
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

gulp.task('prepare:content', ["clean"], function () {
  return gulp.src(paths.content)
    .pipe(gulp.dest(paths.contentDest));
});

gulp.task('prepare:webconfig', ["clean"], function () {
  return gulp.src(paths.webconfig)
    .pipe(gulp.dest(paths.webconfigDest));
});

gulp.task('prepare', ['prepare:content', 'prepare:webconfig']);

gulp.task("min", ["min:js", "min:css"]);
gulp.task("build", ["min"]);//alias

gulp.task('prepublish', shell.task(project.scripts.prepublish))
//gulp.task('postpublish', shell.task(project.scripts.postpublish))
//gulp.task('publish', ['prepublish', 'postpublish'])