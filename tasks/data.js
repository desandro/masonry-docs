var gulp = require('gulp');
var getTransform = require('./utils/get-transform');
var path = require('path');

var dataSrc = 'data/*.json';

module.exports = function( site ) {

  gulp.task( 'json-data', function() {
    return gulp.src( dataSrc )
      .pipe( getTransform( function( file, enc, next ) {
        var basename = path.basename( file.path, path.extname( file.path ) );
        site.data[ basename ] = JSON.parse( file.contents.toString() );
        next( null, file );
      }) );
  });

  gulp.task( 'masonry-version', function() {
    return gulp.src('bower_components/masonry/.bower.json')
      .pipe( getTransform( function( file, enc, next ) {
        var json = JSON.parse( file.contents.toString() );
        site.data.masonryVersion = json.version;
        site.data.masonryMinorVersion = json.version.match(/^\d\.\d+/)[0];
        // site.data.masonryVersion = '4.0.0';
        // site.data.masonryMinorVersion = '4.0';
        next( null, file );
      }));
  });

  gulp.task( 'data', [ 'json-data', 'masonry-version' ] );

  site.watch( dataSrc, [ 'content' ] );

};
