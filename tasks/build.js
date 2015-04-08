// hacking gulp-build
// https://github.com/tjeastmond/gulp-build/blob/master/index.js

var through = require('through2');
var hbs = require('handlebars');
var path = require('path');

function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

module.exports = function(data, config) {
  var options = extend({
    layout: null,
    partials: [],
    helpers: []
  }, config);

  data = data || {};

  var build = function(file, encoding, callback) {
    var fileContents = file.contents.toString();
    var template = '';

    if ( options.helpers.length ) {
      options.helpers.forEach( function( helper ) {
        hbs.registerHelper( helper.name, helper.fn );
      });
    }

    if ( options.partials.length ) {
      options.partials.forEach( function( partial ) {
        hbs.registerPartial( partial.name, partial.tpl );
      });
    }

    if ( typeof options.layout == 'string' && options.layout.indexOf('{{> body') !== -1 ) {
      hbs.registerPartial('body', fileContents);
      template = hbs.compile(options.layout);
    } else {
      template = hbs.compile(fileContents);
    }

    // add file data, front matter data to data obj
    data.page = file.frontMatter;
    data.file_path = path.relative( file.cwd, file.path );
    data.basename = path.basename( file.path, path.extname( file.path ) );

    file.contents = new Buffer(template(data));

    return callback(null, file);
  };

  return through.obj(build);
};
