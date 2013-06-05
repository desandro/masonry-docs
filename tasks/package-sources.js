/**
 * package sources
 * creates packery.pkgd.js
 * concats and minifies all .js for Packery 
 */

var organizeSources = require('./utils/organize-sources');

module.exports = function( grunt ) {

  // create packery.pkgd.js
  grunt.registerTask( 'package-sources', function() {
    // copy over just the packery obj
    var bowerMap = grunt.config.get('bowerMap');
    var packeryMap = {
      packery: bowerMap.packery
    };

    var packerySources = organizeSources( packeryMap );
    // console.log( packerySources );
    var srcs = packerySources['.js'];
    // filter out minified files, like EventEmitter.min.js
    srcs = srcs.filter( function( src ) {
      return src.indexOf('.min.js') === -1;
    });
    grunt.config.set( 'concat.pkgd.src', srcs );
  });

};
