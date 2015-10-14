/*!
 * Masonry Docs site scripts
 */

( function( window ) {

'use strict';

// global namespace, MD = Masonry Docs
var MD = window.MD = {};
// hash of page controllers
MD.pages = {};
// hash of modules
MD.modules = {};
var notifElem;

// -------------------------- eventie.matchesAdd -------------------------- //

// extend eventie
// adds event listener and filters for selector
eventie.filterBind = function( elem, eventName, selector, listener ) {
  return eventie.bind( elem, eventName, function( event ) {
    if ( matchesSelector( event.target, selector ) ) {
      listener.call( event.target, event );
    }
  });
};

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

  initModules();

  var refactorTitle = document.querySelector('.refactor-shirt h3');
  var endDate = new Date( 2015, 9, 28 );
  var days = Math.round( ( endDate - new Date() ) / ( 1000 * 60 * 60 * 24 ) );
  setText( refactorTitle, 'Refactor shirts. Only on sale for ' + days + ' more days.' );

});

function initModules() {
  // init module instance for all elements with data-module attributes
  var moduleElems = document.querySelectorAll('[data-js-module]');
  for ( var i=0, len = moduleElems.length; i < len; i++ ) {
    var elem = moduleElems[i];
    var moduleName = elem.getAttribute('data-js-module');
    var module = MD.modules[ moduleName ];
    if ( module ) {
      module( elem );
    }
  }
}

// -------------------------- helpers -------------------------- //

MD.getItemElement = function() {
  var elem = document.createElement('div');
  var wRand = Math.random();
  var hRand = Math.random();
  var widthClass = wRand > 0.8 ? 'grid-item--width3' :
    wRand > 0.6 ? 'grid-item--width2' : '';
  var heightClass = hRand > 0.8 ? 'grid-item--height3' :
    hRand > 0.5 ? 'grid-item--height2' : '';
  elem.className = 'grid-item ' + widthClass + ' ' + heightClass;
  return elem;
};

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

MD.notify = function( message ) {
  setText( notifElem, message + ' at ' + getTimestamp() );

  if ( transitionProp ) {
    notifElem.style[ transitionProp ] = 'none';
  }
  notifElem.style.display = 'block';
  notifElem.style.opacity = '1';

  // hide the notification after a second
  if ( notifyTimeout ) {
    clearTimeout( notifyTimeout );
  }

  notifyTimeout = setTimeout( MD.hideNotify, hideTime );
};

function getTimestamp() {
  var now = new Date();
  var min = now.getMinutes();
  min = min < 10 ? '0' + min : min;
  var seconds = now.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return [ now.getHours(), min, seconds ].join(':');
}

MD.hideNotify = function() {
  if ( transitionProp ) {
    notifElem.style[ transitionProp ] = 'opacity 1.0s';
    notifElem.style.opacity = '0';
  } else {
    notifElem.style.display = 'none';
  }
};

})( window );
