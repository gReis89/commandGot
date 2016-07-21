var gulp = require('gulp'),
    jshint = require('gulp-jshint');

gulp.task('assets:js', function() {
    return gulp.src(server.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
