/**
 * parse JSON Front Matter
 * @param {String} src - file source
 * @returns {Object} parsed
 *   {Object} json
 *   {String} src
 */

module.exports = function( src ) {
  // file must begin with ---
  var parsed = {
    src: src
  };
  if ( src.indexOf('---\n') !== 0 ) {
    return parsed;
  }
  var split = src.split('---\n');
  var json;
  try {
    json = JSON.parse( split[1] );
  } catch ( err ) {}

  if ( !json ) {
    return parsed;
  }

  // remove first parts
  split.splice( 0, 2 );
  parsed.json = json;
  parsed.src = split.join('---\n');
  return parsed;
};
