/// <binding Clean='clean' />
'use strict';

var gulp = require('gulp'),
    rimraf = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    fs = require('fs'),
    shell = require('gulp-shell'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    gzip = require('gulp-gzip');

var project = JSON.parse(fs.readFileSync('./project.json'));

var content = './Content/';
var webroot = './wwwroot/';

var paths = {
    contentFavicon: content + 'favicon.ico',
    contentWebconfig: content + 'web.config',
    contentHumans: content + 'humans.txt',
    contentRobots: content + 'robots.txt',
    contentStyles: content + 'styles/**/*.css',
    contentScripts: content + 'scripts/**/*.js',
    contentImages: [
        content + 'images/**/*.png', 
        content + 'images/**/*.jpg', 
        content + 'images/**/*.gif'
    ],
    contentLibs: './bower_components/**/*',
    
    siteFavicon: webroot,
    siteWebconfig: webroot,
    site: webroot,
    siteStylesFolder: webroot + 'styles/',
    siteScriptsFolder: webroot + 'scripts/',
    siteImagesFolder: webroot + 'images/',
    siteLibsFolder: webroot + 'libs/',
    siteStyleMin: webroot + 'site.min.css',
    siteScriptMin: webroot + 'app.min.js'
};

gulp.task('clean', function () {
    return gulp.src(paths.site, { read: false })
        .pipe(rimraf({ force: true }));
});

gulp.task('scripts:clean', function () {
    return gulp.src(paths.siteScriptsFolder, { read: false })
        .pipe(rimraf({ force: true }));
});

gulp.task('styles:clean', function () {
    return gulp.src(paths.siteStylesFolder, { read: false })
        .pipe(rimraf({ force: true }));
});

gulp.task('libs:clean', function () {
    return gulp.src(paths.siteLibsFolder, { read: false })
        .pipe(rimraf({ force: true }));
});

gulp.task('images:clean', function () {
    return gulp.src(paths.siteImagesFolder, { read: false })
        .pipe(rimraf({ force: true }));
});

gulp.task('libs:clean', function () {
    return gulp.src(paths.siteLibsFolder, { read: false })
        .pipe(rimraf({ force: true }));
});

gulp.task('prepare:files', function () {
    return gulp.src([
        paths.contentFavicon,
        paths.contentWebconfig,
        paths.contentHumans,
        paths.contentRobots
    ])
        .pipe(gulp.dest(paths.siteFavicon));
});

gulp.task('styles:prepare', ['styles:clean'], function () {
    return gulp.src(paths.contentStyles)
        .pipe(gulp.dest(paths.siteStylesFolder));
});

gulp.task('styles:min:prepare', function () {
    return gulp.src(paths.contentStyles)
        .pipe(plumber())
        .pipe(concat(paths.siteStyleMin))
        .pipe(cssmin())
        .pipe(gzip())
        .pipe(gulp.dest('.'));
});

gulp.task('scripts:prepare', ['scripts:clean'], function () {
    return gulp.src(paths.contentScripts)
        .pipe(gulp.dest(paths.siteScriptsFolder));
});

gulp.task('scripts:min:prepare', function () {
    return gulp.src(paths.contentScripts, {
        base: '.'
    })
        .pipe(plumber())
        .pipe(concat(paths.siteScriptMin))
        .pipe(uglify())
        .pipe(gzip())
        .pipe(gulp.dest('.'));
});

gulp.task('images:prepare', ['images:clean'], function () {
    return gulp.src(paths.contentImages)
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: false,
                optimizationLevel: 3,
                colors: 16
            }),
            imageminJpegRecompress({
                quality: 'low',//low, medium, high and veryhigh.
                method: 'smallfry',//mpe, ssim, ms-ssim and smallfry,
                progressive: false,
                subsample: 'default', //default, disable
                strip: true
            }),
            imagemin.optipng({
                optimizationLevel: 7,// default 3, range 0..7
                bitDepthReduction: true,// default true
                colorTypeReduction: true,// default true
                paletteReduction: true// default true
            }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest(paths.siteImagesFolder));
});

gulp.task('libs:prepare', ['libs:clean'], function() {
    return gulp.src(paths.contentLibs)
        .pipe(gulp.dest(paths.siteLibsFolder));
});

gulp.task('prepublish', shell.task(project.scripts.prepublish));
//gulp.task('postpublish', shell.task(project.scripts.postpublish))
//gulp.task('publish', ['prepublish', 'postpublish'])

gulp.task('site:run', shell.task(['dnx web']));

gulp.task('site:watch', shell.task(['dnx-watch web']));

gulp.task('styles:watch', function (cb) {//'scripts:prepare'
    watch(paths.contentStyles, function () {
        return gulp.src(paths.contentStyles)
            .pipe(plumber())
            .pipe(watch(paths.contentStyles))
            .pipe(gulp.dest(paths.siteStylesFolder))
            .on('end', cb);
    });
});

gulp.task('scripts:watch', function (cb) {//'scripts:prepare'
    watch(paths.contentScripts, function () {
        return gulp.src(paths.contentScripts)
            .pipe(plumber())
            .pipe(watch(paths.contentStyles))
            .pipe(gulp.dest(paths.siteScriptsFolder))
            .on('end', cb);
    });
});

//development
gulp.task('default', [
    'prepare:files',
    'styles:prepare',
    'scripts:prepare',
    'images:prepare',
    'libs:prepare',
    'styles:watch',
    'scripts:watch',
    'site:run'
]);

//release
gulp.task('release', [
    'prepare:files',
    'styles:min:prepare',
    'scripts:min:prepare',
    'images:prepare',
    'libs:prepare'
]);