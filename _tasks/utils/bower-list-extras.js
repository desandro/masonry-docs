
var path = require('path');
var spawn = require('child_process').spawn;

// get JSON from bower list
function getJson( callback ) {
  var childProc = spawn( 'bower', 'list --json'.split(' ') );
  var jsonSrc = '';
  childProc.stdout.setEncoding('utf8');
  childProc.stdout.on('data',  function( data ) {
    jsonSrc += data;
  });

  childProc.on('close', function() {
    var json = JSON.parse( jsonSrc );
    callback( json );
  });
}

// get a main source map, with dependencies
function getMap( json ) {
  var map = {};
  // add main
  var main = json.pkgMeta.main;
  if ( main ) {
    if ( Array.isArray( main ) ) {
      map.main = main.map( function( mainFile ) {
        return path.normalize( json.canonicalDir + '/' + mainFile );
      });
    } else {
      map.main = path.normalize( json.canonicalDir + '/' + main );
    }
  }
  // get recursive dependencies' map
  if ( !isEmptyObject( json.dependencies ) ) {
    map.dependencies = {};
    for ( var pkgName in json.dependencies ) {
      var dependencyJson = json.dependencies[ pkgName ];
      map.dependencies[ pkgName ] = getMap( dependencyJson );
    }
  }

  return map;
}

function isEmptyObject( obj ) {
  for ( var name in obj ) {
    return false;
  }
  return true;
}

// get array of all main source files, ordered by deepest dependency first
function getDepSources(map) {
  var srcs = [];
  // walk up dependency tree, and get their sources
  for (var pkgName in map.dependencies) {
    var dependency = map.dependencies[pkgName];
    var depSrcs = getDepSources(dependency);
    srcs.push.apply(srcs, depSrcs);
  }
  // add this package's main
  if ( map.main) {
    srcs = srcs.concat( map.main );
  }
  return srcs;
}

// remove duplicates, organize by file extension
function organizeSources(srcs) {
  var sources = {};

  srcs.forEach(function (src) {
    // organize by extension
    var ext = path.extname( src );
    sources[ ext ] = sources[ ext ] || [];
    // add source if not already added
    if ( sources[ ext ].indexOf( src ) === -1 ) {
      sources[ ext ].push( src );
    }
  });

  return sources;
}

function getDependencyMap( depName, map ) {
  for ( var pkgName in map.dependencies ) {
    var dependency = map.dependencies[ pkgName ];
    if ( pkgName === depName ) {
      return dependency;
    }
    getDependencyMap( dependency );
  }
}


module.exports = {

  map: function( pkgName, callback ) {
    callback = callback || pkgName;
    getJson( function( json ) {
      var map = getMap( json );
      if ( pkgName ) {
        map = getDependencyMap( pkgName, map );
      }
      callback( map );
    });
  },

  sources: function( pkgName, callback ) {
    callback = callback || pkgName;
    getJson( function( json ) {
      var map = getMap( json );
      if ( pkgName ) {
        map = getDependencyMap( pkgName, map );
      }
      var sources = getDepSources(map);
      sources = organizeSources(sources);
      callback( sources );
    });
  }

};
