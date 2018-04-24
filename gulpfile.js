var gulp = require("gulp");

var scss = require("gulp-sass");

var autoprefixer = require("gulp-autoprefixer");

var minCss = require("gulp-clean-css");

var server = require("gulp-webserver");

var sequence = require("gulp-sequence");

var queryString = require("querystring");

var url = require("url");

var homeJson = require("./src/data/home.json");

var searchJson = require("./src/data/search.json");

// var detail352876 = require("./src/data/352876.json");

console.log(homeJson)

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

                if (req.url === '/index') {
                    res.setHeader('Content-Type', 'text/json;charset=UTF-8')
                    res.end(JSON.stringify(homeJson))
                } else if (/\/api\/search/g.test(req.url)) {
                    var keyword = url.parse(req.url, true).query.keyword;
                    var list = searchJson.items;
                    var arr = [];
                    for (var i = 0, len = list.length; i < len; i++) {
                        if (list[i].title.match(keyword)) {
                            arr.push(list[i])
                        }
                    }

                    res.end(JSON.stringify(arr))


                }
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