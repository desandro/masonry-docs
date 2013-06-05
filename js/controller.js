/*!
 * Packery site scripts
 */

( function( window ) {

'use strict';

// global namespace, PS = Packery Site
var PS = window.PS = {};
// hash of page controllers
PS.pages = {};

// -------------------------- page controller -------------------------- //

docReady( function() {
  // get name of page
  var pageAttr = document.body.getAttribute('data-page');
  // trigger controller if there
  if ( pageAttr && typeof PS[ pageAttr ] === 'function' ) {
    PS[ pageAttr ]();
  }

});



// -------------------------- helpers -------------------------- //

PS.getSomeItemElements = function() {
  var fragment = document.createDocumentFragment();
  var items = [];
  for ( var i=0; i < 3; i++ ) {
    var item = document.createElement('div');
    var wRand = Math.random();
    var widthClass = wRand > 0.85 ? 'w4' :
      wRand > 0.7 ? 'w2' : '';
    var hRand = Math.random();
    var heightClass = hRand > 0.85 ? 'h4' :
      hRand > 0.7 ? 'h2' : '';
    item.className = 'item ' + widthClass + ' ' + heightClass;
    fragment.appendChild( item );
    items.push( item );
  }
  // ex7.appendChild( fragment );
  // return
};

})( window );
