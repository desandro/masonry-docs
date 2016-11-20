var gulp = require('gulp');
var concat = require('gulp-concat');
var getGlobPaths = require('./utils/get-glob-paths');

var cssSrc = [
  // dependencies
  'bower_components/normalize.css/normalize.css',
  // fizzy docs modules
  'bower_components/fizzy-docs-modules/*/*.css',
  // base
  'css/*.css',
  // modules
  'modules/*/**/*.css'
];

gulp.task( 'css', function() {
  gulp.src( cssSrc )
    .pipe( concat('masonry-docs.css') )
    .pipe( gulp.dest('build/css') );
});

module.exports = function( site ) {
  site.data.cssPaths = getGlobPaths( cssSrc );
};
