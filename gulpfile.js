var gulp = require("gulp");

var scss = require("gulp-sass");

var autoprefixer = require("gulp-autoprefixer");

var minCss = require("gulp-clean-css");

var server = require("gulp-webserver");

var sequence = require("gulp-sequence");

gulp.task("minCss", function() {
    gulp.src("src/scss/*.scss")
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4']
        }))
        .pipe(minCss())
        .pipe(gulp.dest("src/css"))
})

gulp.task("server", ['minCss', 'copyCss'], function() {
    gulp.src("src")
        .pipe(server({
            port: '1234',
            host: '169.254.5.149',
            livereload: true,
            // open: true,
            middleware: function(req, res, next) {
                next()
            }
        }))
})

gulp.task("copyCss", function() {
    gulp.src("src/scss/*.css")
        .pipe(gulp.dest("src/css"))
})

gulp.task("watch", function() {
    gulp.watch("src/**/*.scss", ['minCss']);
})

gulp.task("default", ['minCss', 'copyCss', 'server', 'watch'])