/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    fs = require('fs'),
    shell = require('gulp-shell'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber');

var project = JSON.parse(fs.readFileSync('./project.json'));

var content = "./Content/";
var styles = "./Styles/";
var scripts = "./Scripts/";
var webroot = "./wwwroot/";

var paths = {
    contentFavicon: content + "favicon.ico",
    contentWebconfig: content + "web.config",
    contentStyles: content + "styles/**/*.css",
    contentScripts: content + "scripts/**/*.js",
    contentImages: [content + "images/**/*.png", content + "images/**/*.jpg"],

    siteFavicon: webroot,
    siteWebconfig: webroot,
    site: webroot,
    siteStylesFolder: webroot + "styles/",
    siteScriptsFolder: webroot + "scripts/",
    siteImagesFolder: webroot + "images/",
    siteLibsFolder: webroot + "libs/",
    siteStyleMin: webroot + "site.min.css",
    siteScriptMin: webroot + "app.min.js"
};

gulp.task("site:clean", function(cb) {
    rimraf(paths.site, cb);
});

gulp.task("scripts:clean", function(cb) {
    rimraf(paths.siteScriptsFolder, cb);
});

gulp.task("styles:clean", function(cb) {
    rimraf(paths.siteStylesFolder, cb);
});

gulp.task("libs:clean", function(cb) {
    rimraf(paths.siteLibsFolder, cb);
});

gulp.task("images:clean", function(cb) {
    rimraf(paths.siteImagesFolder, cb);
});

gulp.task('prepare:favicon', function() {
    return gulp.src(paths.contentFavicon)
        .pipe(gulp.dest(paths.siteFavicon));
});

gulp.task('prepare:webconfig', function() {
    return gulp.src(paths.contentWebconfig)
        .pipe(gulp.dest(paths.siteWebconfig));
});

gulp.task('styles:prepare', ["styles:clean"], function() {
    return gulp.src(paths.contentStyles)
        .pipe(gulp.dest(paths.siteStylesFolder));
});

gulp.task('styles:min:prepare', function() {
    return gulp.src(paths.contentStyles)
        .pipe(plumber())
        .pipe(concat(paths.siteStyleMin))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task('scripts:prepare', ["scripts:clean"], function() {
    return gulp.src(paths.contentScripts)
        .pipe(gulp.dest(paths.siteScriptsFolder));
});

gulp.task('scripts:min:prepare', function() {
    return gulp.src(paths.contentScripts, {
        base: "."
    })
        .pipe(plumber())
        .pipe(concat(paths.siteScriptMin))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task('images:prepare', ["images:clean"], function() {
    return gulp.src(paths.contentImages)
        .pipe(gulp.dest(paths.siteImagesFolder));
});

gulp.task('libs:prepare', shell.task("bower install --allow-root"));//, ["libs:clean"]

gulp.task('prepublish', shell.task(project.scripts.prepublish));
//gulp.task('postpublish', shell.task(project.scripts.postpublish))
//gulp.task('publish', ['prepublish', 'postpublish'])

gulp.task('site:run', shell.task(['dnx web']));

gulp.task('site:watch', shell.task(['dnx-watch web']));

gulp.task('styles:watch', function(cb) {//'scripts:prepare'
    watch(paths.contentStyles, function() {
        return gulp.src(paths.contentStyles)
            .pipe(plumber())
            .pipe(watch(paths.contentStyles))
            .pipe(gulp.dest(paths.siteStylesFolder))
            .on('end', cb);
    })
});

gulp.task('scripts:watch', function(cb) {//'scripts:prepare'
    watch(paths.contentScripts, function() {
        return gulp.src(paths.contentScripts)
            .pipe(plumber())
            .pipe(watch(paths.contentStyles))
            .pipe(gulp.dest(paths.siteScriptsFolder))
            .on('end', cb);
    })
});

//development
gulp.task('default', [
    'prepare:favicon',
    'prepare:webconfig',
    'styles:prepare',
    'scripts:prepare',
    'images:prepare',
    'libs:prepare',
    'styles:watch',
    'scripts:watch',
    'site:run']);

//release
gulp.task('release', [
    "site:clean",
    'prepare:favicon',
    'prepare:webconfig',
    'styles:min:prepare',
    'scripts:min:prepare',
    'images:prepare',
    'libs:prepare']);