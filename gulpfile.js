const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const wait = require('gulp-wait');

const scripts = require('./scripts');
const jsDest = './dist/';

//style paths
const sassFiles = './src/assets/css/**/*.scss';
const cssDest = './dist/';

var devMode = false;

gulp.task('css', function () {
    return gulp.src(sassFiles)
        .pipe(wait(500))
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(cssDest));
});

gulp.task('js', function() {
    gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('img', function() {
    return gulp.src('./src/assets/images/**/*')
        .pipe(gulp.dest('./dist/assets/images'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build', function() {
    gulp.start(['css', 'js', 'html', 'img']);
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist',
        }
    });
});

gulp.task('start', function() {
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.watch([sassFiles], ['css']);
    gulp.watch(['./src/**/*.js'], ['js']);
    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/assets/images/**/*'], ['img']);
});