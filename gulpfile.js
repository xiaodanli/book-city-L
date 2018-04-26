var gulp = require("gulp");

var scss = require("gulp-sass");

var autoprefixer = require("gulp-autoprefixer");

var minCss = require("gulp-clean-css");

var server = require("gulp-webserver");

var sequcence = require("gulp-sequence");

var queryString = require("querystring");

var url = require("url");

var homeJson = require("./src/data/home.json");

var searchJson = require("./src/data/search.json");

var chapterJson = require("./src/data/chapter-list.json");

var uglify = require("gulp-uglify");

gulp.task("minCss", function() {
    return gulp.src("src/scss/*.scss")
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4']
        }))
        .pipe(minCss())
        .pipe(gulp.dest("dist/css"))
})

gulp.task("uglify", function() {
    return gulp.src(['src/js/**/*.js', '!src/js/libs/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
})

gulp.task("copyJs", function() {
    return gulp.src("src/js/libs/*.js")
        .pipe(gulp.dest("dist/js/libs"))
})

gulp.task("copyImg", function() {
    return gulp.src("src/imgs/*.{jpg,png}")
        .pipe(gulp.dest("dist/imgs"))
})

gulp.task("copyHtml", function() {
    return gulp.src("src/**/*.html")
        .pipe(gulp.dest("dist"))
})

gulp.task("server", ['minCss', 'copyCss'], function() {
    gulp.src("dist")
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
                } else if (/\/api\/detail/g.test(req.url)) {
                    var fiction_id = url.parse(req.url, true).query.fiction_id;

                    var detail = require("./src/data/" + fiction_id + ".json");

                    res.end(JSON.stringify(detail))
                } else if (/\/api\/chapter/g.test(req.url)) {
                    var fiction_id = url.parse(req.url, true).query.fiction_id;
                    res.end(JSON.stringify(chapterJson));
                } else if (/\/api\/articalUrl/g.test(req.url)) {
                    var fiction_id = url.parse(req.url, true).query.fiction_id;
                    var chapter_id = url.parse(req.url, true).query.chapter_id;
                    var data = require("./src/data/reader/data" + chapter_id + ".json");
                    res.end(JSON.stringify(data));
                }
                next()
            }
        }))
})

gulp.task("copyCss", function() {
    return gulp.src("src/scss/*.css")
        .pipe(gulp.dest("dist/css"))
})

gulp.task("watch", function() {
    gulp.watch("src/**/*.scss", ['minCss']);
})

gulp.task("default", function(cb) {
    sequcence(['minCss', 'copyCss', 'uglify', 'copyJs', 'copyHtml', 'copyImg'], 'server', cb)

})