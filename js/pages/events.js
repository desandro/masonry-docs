/**
 * events page
 */

( function( window ) {

'use strict';

var PS = window.PS;

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


PS.events = function() {

  notifElem = document.querySelector('#notification');

  // ----- dragItemPositioned ----- //

  ( function() {
    var container = document.querySelector('#drag-item-positioned-demo .masonry');
    var itemElems = container.querySelectorAll('.item');
    var msnry = new Masonry( container, {
      columnWidth: 80,
      rowHeight: 80
    });
    // for each item element
    for ( var i=0, len = itemElems.length; i < len; i++ ) {
      var elem = itemElems[i];
      // make element draggable with Draggabilly
      var draggie = new Draggabilly( elem );
      // bind Draggabilly events to Masonry
      msnry.bindDraggabillyEvents( draggie );
    }

    msnry.on( 'dragItemPositioned', function( msnryInstance, draggedItem ) {
      var classes = getClassString( msnryInstance.element );
      notify( 'Masonry ' + classes +
        ' positioned dragged ' + draggedItem.element.nodeName );
    });

  })();

  // ----- fitComplete demo ----- //

  ( function() {
    var container = document.querySelector('#fit-complete-demo .masonry');
    var msnry = new Masonry( container );

    msnry.on( 'fitComplete', function( msnryInstance, item ) {
      var classes = getClassString( item.element );
      notify( 'Fit ' + classes );
    });

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      var target = event.target;
      if ( !classie.has( target, 'item' ) ) {
        return;
      }

      msnry.fit( target, 40, 40 );
    });
  })();

  // ----- layoutComplete demo ----- //

  ( function() {
    var container = document.querySelector('#layout-complete-demo .masonry');
    var msnry = new Masonry( container );
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
    var msnry = new Masonry( container );

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
