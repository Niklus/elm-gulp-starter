var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var exec = require('child_process').exec;
var browserSync = require('browser-sync');
var wbBuild = require('workbox-build');

// minify
gulp.task('compress', function (cb) {
  pump([
      gulp.src('dist/app.js'),
      uglify(),
      gulp.dest('dist')
    ],
    cb
  );
});

// compile
gulp.task('compile', function(cb) {
  exec('npm run elm-make', cb)
});

// serve and watch
gulp.task('serve', ['compile'], function() {
  browserSync.init({
    server: 'www',
    port: 8002
  });
  gulp.watch('src/*.elm', ['compile']);
  gulp.watch('www/*').on('change', browserSync.reload);
});

// Generate service worker
gulp.task('bundle-sw', () => {
  return wbBuild.generateSW({
    globDirectory: './dist/',
    swDest: './dist/sw.js',
    globPatterns: ['**\/*.{js,css,json,ico,png,html,jpg,svg}']
    }).then(() => {
      console.log('Service worker generated.');
    }).catch((err) => {
      console.log('[ERROR] This happened: ' + err);
    });
})

// www files to dist folder
gulp.task('copy', function(){
  gulp.src([
    'www/**/*'
  ]).pipe(gulp.dest('dist'))
});

// default
gulp.task('default', ['serve']);



