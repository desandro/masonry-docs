
// -------------------------- bower list helpers -------------------------- //

var path = require('path');

function getDependencySrcs( list ) {
  var srcs = [];
  var dependency, main;
  for ( var name in list ) {
    dependency = list[ name ];
    main = dependency.source && dependency.source.main;

    if ( dependency.dependencies ) {
      var depSrcs = getDependencySrcs( dependency.dependencies );
      srcs.push.apply( srcs, depSrcs );
    }

    // add main sources to srcs
    if ( main ) {
      if ( Array.isArray( main ) ) {
        srcs.push.apply( srcs, main );
      } else {
        srcs.push( main );
      }
    }

  }
  return srcs;
}

function organizeSources( tree ) {
  // flat source filepaths
  var srcs = getDependencySrcs( tree );
  // remove duplicates, organize by file extension
  var sources = {};

  srcs.forEach( function ( src ) {
    var ext = path.extname( src );
    sources[ ext ] = sources[ ext ] || [];
    if ( sources[ ext ].indexOf( src ) === -1 ) {
      sources[ ext ].push( src );
    }
  });

  return sources;
}

module.exports = organizeSources;
