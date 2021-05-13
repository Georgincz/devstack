var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

sass.compiler = require('node-sass');

gulp.task('sass', function() {
    return gulp.src('./css/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
            stream: true}));
});

gulp.task('minifyCss', function() {
    return gulp.src('./css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
//      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./css/min'))
});

gulp.task('browserSync', function() {
    return browserSync.init({server: {baseDir: './'},
            files: ['*.html','*.css']
        });
});

gulp.task('images', function() {
    return gulp.src('./img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./img'))
});

gulp.task('uglify', function () {
    return gulp.src('./js/*.js')
          .pipe(uglify())
//          .pipe(rename('script.min.js'))
          .pipe(gulp.dest('./js/min'))
});

gulp.task('watch', function() {
    gulp.watch('./css/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.parallel('sass', 'minifyCss', 'browserSync', 'images', 'uglify'));