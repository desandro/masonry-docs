/**
 * faq page
 */

( function( window ) {

'use strict';

var PS = window.PS;

var transitionProp = getStyleProperty('transition');
var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend',
  transition: 'transitionend'
}[ transitionProp ];

// ----- text helper ----- //

var docElem = document.documentElement;
var textSetter = docElem.textContent !== undefined ? 'textContent' : 'innerText';

function setText( elem, value ) {
  elem[ textSetter ] = value;
}

// -------------------------- faq -------------------------- //

PS.faq = function() {

  // ----- animate item size ----- //

  ( function() {
    var container = document.querySelector('#animate-item-size .masonry');
    var msnry = new Masonry( container );

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item content was not clicked on
      var target = event.target;
      if ( !classie.has( target, 'item-content' )  ) {
        return;
      }
      var itemElem = target.parentNode;
      var isExpanded = classie.has( itemElem, 'is-expanded' );
      classie.toggleClass( itemElem, 'is-expanded' );

      if ( isExpanded ) {
        // if shrinking, just layout
        msnry.layout();
      } else {
        // if expanding, fit it
        msnry.fit( itemElem );
      }
    });
  })();

  // ----- animate item size responsive ----- //

  ( function() {
    var container = document.querySelector('#animate-item-size-responsive .masonry');
    var msnry = new Masonry( container );

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item content was not clicked on
      var target = event.target;
      if ( !classie.has( target, 'item-content' )  ) {
        return;
      }

      var previousContentSize = getSize( target );
      // disable transition
      target.style[ transitionProp ] = 'none';
      // set current size
      target.style.width = previousContentSize.width + 'px';
      target.style.height = previousContentSize.height + 'px';

      var itemElem = target.parentNode;
      var isExpanded = classie.has( itemElem, 'is-expanded' );
      classie.toggleClass( itemElem, 'is-expanded' );

      // force redraw
      var redraw = target.offsetWidth;
      // renable default transition
      target.style[ transitionProp ] = '';

      // reset 100%/100% sizing after transition end
      if ( transitionProp ) {
        var onTransitionEnd = function() {
          target.style.width = '';
          target.style.height = '';
          target.removeEventListener( transitionEndEvent, onTransitionEnd, false );
        };
        target.addEventListener( transitionEndEvent, onTransitionEnd, false );
      }

      // set new size
      var size = getSize( itemElem );
      target.style.width = size.width + 'px';
      target.style.height = size.height + 'px';
      redraw = null; // for JSHint

      if ( isExpanded ) {
        // if shrinking, just layout
        msnry.layout();
      } else {
        // if expanding, fit it
        msnry.fit( itemElem );
      }
    });
  })();

  ( function() {
    var container = document.querySelector('#order-after-drag-demo .masonry');
    var msnry = new Masonry( container, {
      columnWidth: 80,
      rowHeight: 80
    });
    var itemElems = msnry.getItemElements();
    // for each item element
    for ( var i=0, len = itemElems.length; i < len; i++ ) {
      var elem = itemElems[i];
      // make element draggable with Draggabilly
      var draggie = new Draggabilly( elem );
      // bind Draggabilly events to Masonry
      msnry.bindDraggabillyEvents( draggie );
    }


    // show item order after layout
    function orderItems() {
      var itemElems = msnry.getItemElements();
      for ( var i=0, len = itemElems.length; i < len; i++ ) {
        var elem = itemElems[i];
        setText( elem, i + 1 );
      }
    }

    msnry.on( 'layoutComplete', orderItems );
    msnry.on( 'dragItemPositioned', orderItems );
  })();

};

})( window );
