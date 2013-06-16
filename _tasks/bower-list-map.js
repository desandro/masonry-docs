/**
 * bower-list-map task
 */

var spawn = require('child_process').spawn;

var organizeSources = require('./utils/organize-sources');

module.exports = function( grunt ) {

  grunt.registerTask( 'bower-list-map', function() {
    var done = this.async();

    // get map JSON from bower list --map
    var childProc = spawn('bower', 'list --map'.split(' ') );
    var mapSrc = '';
    childProc.stdout.setEncoding('utf8');
    childProc.stdout.on('data',  function( data ) {
      mapSrc += data;
    });

    childProc.on('close', function() {
      var bowerMap = JSON.parse( mapSrc );
      // set bowerMap
      grunt.config.set( 'bowerMap', bowerMap );

      // delete bowerMap.jquery;
      var bowerSources = organizeSources( bowerMap );
      // remove jQuery, EventEmitter.min.js
      var bowerJsSources = bowerSources['.js'].filter( function( src ) {
        return src.indexOf('/jquery.js') === -1 &&
          src.indexOf('.min.js') === -1;
      });
      // add bower JS to JS collection
      var jsSrcs = grunt.config.get('concat.js.src');
      jsSrcs = bowerJsSources.concat( jsSrcs );
      grunt.config.set( 'concat.js.src', jsSrcs );
      grunt.config.set( 'uglify.js.files', {
        'build/js/masonry-docs.min.js': jsSrcs
      });

      // add CSS sources from Bower
      if ( bowerSources['.css'] && bowerSources['.css'].length ) {
        var cssSrcs = grunt.config.get( 'concat.css.src' );
        cssSrcs.push.apply( cssSrcs, bowerSources['.css'] );
        // console.log( sources['.css'], cssSrcs );
        grunt.config.set( 'concat.css.src', cssSrcs );
      }

      // copy over all sources for copying into build/
      var copySources = grunt.config.get('copy.bowerSources.src');
      for ( var ext in bowerSources ) {
        var extSources = bowerSources[ ext ];
        copySources.push.apply( copySources, extSources );
      }
      grunt.config.set( 'copy.bowerSources.src', copySources );

      done();
    });

  });

};