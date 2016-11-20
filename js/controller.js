/*!
 * Masonry Docs site scripts
 */

/* jshint browser: true, strict: true, unused: true, undef: true */
/* globals matchesSelector, FizzyDocs */

( function( window ) {

'use strict';

// global namespace, MD = Masonry Docs
var MasonryDocs = window.MasonryDocs = {};

// -------------------------- filterBindEvent -------------------------- //

// adds event listener and filters for selector
window.filterBindEvent = function( elem, eventName, selector, listener ) {
  elem.addEventListener( eventName, function( event ) {
    if ( matchesSelector( event.target, selector ) ) {
      listener.call( event.target, event );
    }
  });
};

// -------------------------- page controller -------------------------- //

// init

var notifElem;

// get some elements
document.addEventListener( 'DOMContentLoaded', function() {

  notifElem = document.querySelector('#notification');

  // init module instance for all elements with data-module attributes
  var moduleElems = document.querySelectorAll('[data-js]');
  for ( var i=0; i < moduleElems.length; i++ ) {
    var elem = moduleElems[i];
    var moduleName = elem.getAttribute('data-js');
    var module = MasonryDocs[ moduleName ] || FizzyDocs[ moduleName ];
    if ( module ) {
      module( elem );
    }
  }

});

// -------------------------- helpers -------------------------- //

MasonryDocs.getItemElement = function() {
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

// -------------------------- notify -------------------------- //

var docElem = document.documentElement;
var transitionProp = typeof docElem.style.transition == 'string' ?
  'transition' : 'WebkitTransition';

var notifyTimeout;
var hideTime = transitionProp ? 1000 : 1500;

MasonryDocs.notify = function( message ) {
  notifElem.textContent = message + ' at ' + getTimestamp();

  notifElem.style[ transitionProp ] = 'none';
  notifElem.style.display = 'block';
  notifElem.style.opacity = '1';

  // hide the notification after a second
  clearTimeout( notifyTimeout );
  notifyTimeout = setTimeout( hideNotify, hideTime );
};

function getTimestamp() {
  var now = new Date();
  var min = now.getMinutes();
  min = min < 10 ? '0' + min : min;
  var seconds = now.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return [ now.getHours(), min, seconds ].join(':');
}

function hideNotify() {
  if ( transitionProp ) {
    notifElem.style[ transitionProp ] = 'opacity 1.0s';
    notifElem.style.opacity = '0';
  } else {
    notifElem.style.display = 'none';
  }
}

})( window );
