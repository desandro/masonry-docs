/**
 * parses content for ``` code blocks
 * use highlight.js tfor syntax highlighting
 */

var highlightjs = require('highlight.js');

// alias XML syntax highlighting as HTML
highlightjs.LANGUAGES.html = highlightjs.LANGUAGES.xml;
highlightjs.LANGUAGES.js = highlightjs.LANGUAGES.javascript;

var reFirstLine = /.*\n/;

module.exports = function highlight( content ) {
  // split by ```, g
  var splitContent = content.split(/\n```/);
  splitContent.forEach( function( block, i ) {
    // get every other block, which is the code
    if ( i % 2 === 0 ) {
      return;
    }

    var langMatch = block.match( reFirstLine );
    var language = langMatch && langMatch[0];
    // remove first line
    if ( language ) {
      block = block.replace( reFirstLine, '' );
      language = language.trim();
    }
    //
    var highlighted;
    if ( language ) {
      highlighted = highlightjs.highlight( language, block ).value;
    } else {
      highlighted = block;
    }
    // set content back with HTML
    splitContent[i] = '<pre><code' +
      ( language ? ' class="' + language + '"' : '' ) + '>' +
      highlighted + '</code></pre>';
  });
  return splitContent.join('\n');
};
