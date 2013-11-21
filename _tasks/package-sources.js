/**
 * package sources
 * creates masonry.pkgd.js
 * built with RequireJS
 */

var requirejs = require('requirejs');

var config = {
  baseUrl: 'bower_components',
  include: [
    'masonry/masonry'
  ],
  out: 'masonry.require.js',
  optimize: 'none'
};

module.exports = function( grunt ) {

  // create isotope.pkgd.js
  grunt.registerTask( 'package-sources', function() {
    var done = this.async();
    requirejs.optimize( config, function() {
      done();
    }, function( err ) {
      grunt.log.error( err );
      done();
    });
  });

};
