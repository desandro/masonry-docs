var gulp = require('gulp');
var concat = require('gulp-concat');
var getGlobPaths = require('./utils/get-glob-paths');

var jsSrc = [
  // masonry dependencies
  'bower_components/ev-emitter/ev-emitter.js',
  'bower_components/get-size/get-size.js',
  'bower_components/desandro-matches-selector/matches-selector.js',
  'bower_components/fizzy-ui-utils/utils.js',
  'bower_components/outlayer/item.js',
  'bower_components/outlayer/outlayer.js',
  // masonry
  'bower_components/masonry/masonry.js',
  // doc dependencies
  'bower_components/imagesloaded/imagesloaded.js',
  // fizzy docs modules
  'bower_components/fizzy-docs-modules/*/*.js',
  // controller
  'js/controller.js',
  // modules
  'modules/**/*.js',
];

// concat & minify js
gulp.task( 'docs-js', function() {
  gulp.src( jsSrc )
    .pipe( concat('masonry-docs.min.js') )
    .pipe( gulp.dest('build/js') );
});

gulp.task( 'copy-js', function() {
  gulp.src('bower_components/jquery/dist/jquery.min.js')
    .pipe( gulp.dest('build/js') );
});

gulp.task( 'js', [ 'docs-js', 'copy-js' ] );

module.exports = function( site ) {

  site.data.jsPaths = getGlobPaths( jsSrc );

};
