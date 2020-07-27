const gulp = require("gulp");
const babel = require('gulp-babel');

const src =  "./server/**/*.ts"

gulp.task("default", function () {
    return gulp.src(src)
      .pipe(babel())
      .pipe(gulp.dest("dist"));
});

if (process.env.NODE_ENV !== 'production') {
  gulp.watch(src, gulp.series('default'));
}
