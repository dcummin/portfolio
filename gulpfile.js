var gulp = require ('gulp');
var sass = require("gulp-sass"); //Requires the gulp-sass plugin
var browserSync = require("browser-sync").create();
var autoprefixer = require("gulp-autoprefixer");
var uglifycss = require('gulp-uglifycss');
var rename = require("gulp-rename");
// var uglify = require("gulp-uglify");

// gulp.task('task-name', function () {
//   return gulp.src('source-files') // Get source files with gulp.src
//     .pipe(aGulpPlugin()) // Sends it through a gulp plugin
//     .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
// })

gulp.task("sass", function(){
  return gulp.src("scss/styles.scss") //gets all files ending in scss in the current folder
  .pipe(sass()) //using gulp-sass
  .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
          }))
   .pipe(rename("styles.min.css"))
  .pipe(gulp.dest("css"))
  .pipe(browserSync.reload({
    stream: true
  }))
});

//gulp watch for changes
gulp.task("watch", ["browserSync", "sass"], function(){
  gulp.watch("scss/*.scss", ["sass"]); //files to watch, tasks to run
  gulp.watch("./css/*.css", browserSync.reload);
  gulp.watch("./*.html", browserSync.reload);
  gulp.watch("./js/*.js", browserSync.reload);
})

// gulp.task("compress", function(){
//   return gulp.src("scss/*.scss")
//   .pipe(uglify())
//   .pipe(gulp.dest("css"))
// })

gulp.task("browserSync", function(){
  browserSync.init({
    server: {
      baseDir: "."
    },
  })
})
