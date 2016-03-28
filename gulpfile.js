var gulp = require('gulp'),
    connect = require('gulp-connect-php'),
    browserSync = require('browser-sync'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    concat = require('gulp-concat');

gulp.task('connect-sync', function() {
  connect.server({base: 'public'}, function (){
    browserSync({
      proxy: '127.0.0.1:8000',
      index: "index.php",
      open: true,
      notify: true,
      livereload : true
    });
  });

  gulp.watch(['**/*.php','./public/assets/js/scripts/*.js'],['browserify','browserSync']);
  
  //gulp.watch('./public/assets/js/scripts/*.js',['browserify','browserSync']);
  
  //gulp.watch('**/*.css',['browserify','browserSync']);
  
});

gulp.task('browserify', function() {
    // Grabs the app.js file
	
	gulp.src('./public/assets/js/scripts/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/assets/js/'));
	
	return browserify(['./public/assets/js/app.js'])
    // bundles it and creates a file called main.js
    .bundle()
    .pipe(source('main.js'))
    // saves it the public/js/ directory
    .pipe(gulp.dest('./public/assets/js/'));
	
	/*return gulp.src('./public/assets/js/scripts/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/assets/js/'));*/
	
});

gulp.task('browserSync',function() {
	browserSync.reload();
});

gulp.task('default', ['connect-sync'], function () {
});

