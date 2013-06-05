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
    var container = document.querySelector('#drag-item-positioned-demo .packery');
    var itemElems = container.querySelectorAll('.item');
    var pckry = new Packery( container, {
      columnWidth: 80,
      rowHeight: 80
    });
    // for each item element
    for ( var i=0, len = itemElems.length; i < len; i++ ) {
      var elem = itemElems[i];
      // make element draggable with Draggabilly
      var draggie = new Draggabilly( elem );
      // bind Draggabilly events to Packery
      pckry.bindDraggabillyEvents( draggie );
    }

    pckry.on( 'dragItemPositioned', function( pckryInstance, draggedItem ) {
      var classes = getClassString( pckryInstance.element );
      notify( 'Packery ' + classes +
        ' positioned dragged ' + draggedItem.element.nodeName );
    });

  })();

  // ----- fitComplete demo ----- //

  ( function() {
    var container = document.querySelector('#fit-complete-demo .packery');
    var pckry = new Packery( container );

    pckry.on( 'fitComplete', function( pckryInstance, item ) {
      var classes = getClassString( item.element );
      notify( 'Fit ' + classes );
    });

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      var target = event.target;
      if ( !classie.has( target, 'item' ) ) {
        return;
      }

      pckry.fit( target, 40, 40 );
    });
  })();

  // ----- layoutComplete demo ----- //

  ( function() {
    var container = document.querySelector('#layout-complete-demo .packery');
    var pckry = new Packery( container );
    pckry.on( 'layoutComplete', function( pckryInstance, laidOutItems ) {
      var classes = getClassString( pckryInstance.element );
      notify( 'Packery ' + classes + ' layout completed on ' + laidOutItems.length + ' items' );
    });

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      if ( !classie.has( event.target, 'item' ) ) {
        return;
      }
      // change size of item via class
      classie.toggle( event.target, 'gigante' );
      // trigger layout
      pckry.layout();
    });
  })();

  // ----- removeComplete demo ----- //

  ( function() {
    var container = document.querySelector('#remove-complete-demo .packery');
    var pckry = new Packery( container );

    pckry.on( 'removeComplete', function( pckryInstance, items ) {
      var classes = getClassString( pckryInstance.element );
      notify( 'Removed ' + items.length + ' items from ' + classes );
    });

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      if ( !classie.has( event.target, 'item' ) ) {
        return;
      }
      // remove clicked element
      pckry.remove( event.target );
    });
  })();

};

})( window );
