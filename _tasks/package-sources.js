/**
 * package sources
 * creates masonry.pkgd.js
 * concats and minifies all .js for Masonry
 */

var organizeSources = require('./utils/organize-sources');

module.exports = function( grunt ) {

  // create masonry.pkgd.js
  grunt.registerTask( 'package-sources', function() {
    // copy over just the masonry obj
    var bowerMap = grunt.config.get('bowerMap');

    var masonrySources = organizeSources( bowerMap, 'masonry' );
    // console.log( masonrySources );
    var srcs = masonrySources['.js'];
    // filter out minified files, like EventEmitter.min.js
    srcs = srcs.filter( function( src ) {
      return src.indexOf('.min.js') === -1;
    });
    grunt.config.set( 'concat.pkgd.src', srcs );
  });

};
