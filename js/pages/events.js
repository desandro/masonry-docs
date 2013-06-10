/**
 * events page
 */

( function( window ) {

'use strict';

var MD = window.MD;

// ----- text helper ----- //

var docElem = document.documentElement;
var textSetter = docElem.textContent !== undefined ? 'textContent' : 'innerText';

function setText( elem, value ) {
  elem[ textSetter ] = value;
}

// -------------------------- notify -------------------------- //

var transitionProp = getStyleProperty('transition');

function timeStamp() {
  var now = new Date();
  var min = now.getMinutes();
  min = min < 10 ? '0' + min : min;
  var seconds = now.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return [ now.getHours(), min, seconds ].join(':');
}

var notifElem;
var notifyTimeout;
var hideTime = transitionProp ? 1000 : 1500;

function notify( message ) {
  message += ' at ' + timeStamp();
  setText( notifElem, message );

  if ( transitionProp ) {
    notifElem.style[ transitionProp ] = 'none';
  }
  notifElem.style.display = 'block';
  notifElem.style.opacity = '1';

  if ( notifyTimeout ) {
    clearTimeout( notifyTimeout );
  }

  notifyTimeout = setTimeout( hideNotify, hideTime );
}

function hideNotify() {
  if ( transitionProp ) {
    notifElem.style[ transitionProp ] = 'opacity 1.0s';
    notifElem.style.opacity = '0';
  } else {
    notifElem.style.display = 'none';
  }
}

// -----  ----- //

function getClassString( elem ) {
  return '.' + elem.className.split(' ').join('.');
}


MD.events = function() {

  notifElem = document.querySelector('#notification');

  // ----- layoutComplete demo ----- //

  ( function() {
    var container = document.querySelector('#layout-complete-demo .masonry');
    var msnry = new Masonry( container, {
      columnWidth: 60
    });
    msnry.on( 'layoutComplete', function( msnryInstance, laidOutItems ) {
      var classes = getClassString( msnryInstance.element );
      notify( 'Masonry ' + classes + ' layout completed on ' + laidOutItems.length + ' items' );
    });

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      if ( !classie.has( event.target, 'item' ) ) {
        return;
      }
      // change size of item via class
      classie.toggle( event.target, 'gigante' );
      // trigger layout
      msnry.layout();
    });
  })();

  // ----- removeComplete demo ----- //

  ( function() {
    var container = document.querySelector('#remove-complete-demo .masonry');
    var msnry = new Masonry( container, {
      columnWidth: 60
    });

    msnry.on( 'removeComplete', function( msnryInstance, items ) {
      var classes = getClassString( msnryInstance.element );
      notify( 'Removed ' + items.length + ' items from ' + classes );
    });

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      if ( !classie.has( event.target, 'item' ) ) {
        return;
      }
      // remove clicked element
      msnry.remove( event.target );
    });
  })();

};

})( window );
