
// -------------------------- bower list helpers -------------------------- //

var path = require('path');

module.exports = function( json, dependencyName ) {
  // limit json to dependency, if provided
  var endpointSource = json.endpoint.source;
  if ( dependencyName ) {
    json = getDependencyJson( json, dependencyName );
  }

  if ( !json ) {
    return;
  }

  var depSources = getDependencySources( json );
  // remove leading stuff, just get to bower_components/foo
  depSources = depSources.map( function( sourcePath ) {
    return sourcePath.replace( endpointSource + '/', '' );
  });

  var sources = organizeSources( depSources );

  return sources;
};

// get dependency with provided name
function getDependencyJson( pkg, dependencyName ) {
  if ( !pkg.dependencies ) {
    return;
  }
  var dependency;

  for ( var pkgName in pkg.dependencies ) {
    dependency = pkg.dependencies[ pkgName ];
    if ( pkgName === dependencyName ) {
      return dependency;
    }
  }

  for ( pkgName in pkg.dependencies ) {
    dependency = pkg.dependencies[ pkgName ];
    return getDependencyJson( dependency );
  }

}

// get array of all main source files, ordered by deepest dependency first
function getDependencySources( pkg ) {
  var srcs = [];
  // walk up dependency tree, and get their sources
  for ( var pkgName in pkg.dependencies ) {
    var dependency = pkg.dependencies[ pkgName ];
    var depSrcs = getDependencySources( dependency );
    srcs.push.apply( srcs, depSrcs );
  }
  // add this package's main
  var main = pkg.pkgMeta && pkg.pkgMeta.main;
  if ( main ) {
    var mainPath;
    if ( Array.isArray( main ) ) {
      mainPath = main.map( function( mainFile ) {
        return path.normalize( pkg.canonicalDir + '/' + mainFile );
      });
    } else {
      mainPath = path.normalize( pkg.canonicalDir + '/' + main );
    }

    srcs = srcs.concat( mainPath );
  }
  return srcs;
}


function organizeSources( srcs ) {
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
