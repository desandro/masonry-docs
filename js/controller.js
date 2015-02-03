/*!
 * Masonry Docs site scripts
 */

( function( window ) {

'use strict';

// global namespace, MD = Masonry Docs
var MD = window.MD = {};
// hash of page controllers
MD.pages = {};
var notifElem;

// -------------------------- page controller -------------------------- //

docReady( function() {
  // get some elements
  notifElem = document.querySelector('#notification');

  // get name of page
  var pageAttr = document.body.getAttribute('data-page');
  // trigger controller if there
  if ( pageAttr && typeof MD[ pageAttr ] === 'function' ) {
    MD[ pageAttr ]();
  }


  var refactorTitle = document.querySelector('.refactor-shirt h3');
  var feb17 = new Date( 2015, 1, 17 );
  var days = Math.round( ( feb17 - new Date() ) / ( 1000 * 60 * 60 * 24 ) );
  setText( refactorTitle, 'Refactor shirts. Only on sale for ' + days + ' more days.' );
});

// -------------------------- helpers -------------------------- //

MD.getSomeItemElements = function() {
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

// ----- text helper ----- //

var docElem = document.documentElement;
var textSetter = docElem.textContent !== undefined ? 'textContent' : 'innerText';

function setText( elem, value ) {
  elem[ textSetter ] = value;
}

// -------------------------- notify -------------------------- //

var transitionProp = getStyleProperty('transition');

var notifyTimeout;
var hideTime = transitionProp ? 1000 : 1500;

MD.notify = function( message, isGonnaHide ) {
  setText( notifElem, message );

  if ( transitionProp ) {
    notifElem.style[ transitionProp ] = 'none';
  }
  notifElem.style.display = 'block';
  notifElem.style.opacity = '1';

  // hide the notification after a second
  if ( isGonnaHide ) {
    if ( notifyTimeout ) {
      clearTimeout( notifyTimeout );
    }

    notifyTimeout = setTimeout( MD.hideNotify, hideTime );
  }
};

MD.hideNotify = function() {
  if ( transitionProp ) {
    notifElem.style[ transitionProp ] = 'opacity 1.0s';
    notifElem.style.opacity = '0';
  } else {
    notifElem.style.display = 'none';
  }
};

})( window );
