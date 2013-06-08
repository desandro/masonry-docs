/**
 * methods page
 */

( function( window ) {

'use strict';

var PS = window.PS;

var Draggabilly = window.Draggabilly;

// --------------------------  -------------------------- //

var defView = document.defaultView;

var getStyle = defView && defView.getComputedStyle ?
  function( elem ) {
    return defView.getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };


// --------------------------  -------------------------- //

/**
 * create and return an item element
 * @returns {Element} item
 */
function getItem( isRando ) {
  var item = document.createElement('div');
  var wRand = Math.random();
  var widthClass = wRand > 0.9 ? 'w4' :
    wRand > 0.7 ? 'w2' : '';
  var hRand = Math.random();
  var heightClass = hRand > 0.7 ? 'h2' : '';
  item.className = 'item ' + widthClass + ' ' + heightClass;
  // random sizing
  if ( isRando ) {
    item.style.width =  Math.round( Math.random() * Math.random() * 110 + 20 ) + 'px';
    item.style.height = Math.round( Math.random() * Math.random() * 90 + 20 ) + 'px';
  }
  return item;
}

/**
 * add items to a Masonry
 * keep doing it until it's full
 */
function addItems( pckry, maxY, isRando ) {
  // stop after packery reaches height
  // console.log(pckry.maxY);
  if ( pckry.maxY > maxY ) {
    return;
  }
  var fragment = document.createDocumentFragment();
  var items = [];
  for ( var i=0; i < 4; i++ ) {
    var item = getItem( isRando );
    items.push( item );
    fragment.appendChild( item );
    // var draggie = new Draggabilly( item );
    // pckry.bindDraggabillyEvents( draggie );
  }

  pckry.element.appendChild( fragment );
  pckry.appended( items );
  // do it again
  setTimeout( function() {
    addItems( pckry, maxY, isRando );
  }, 40 );

  return items;

}

// bind draggabillies to packry,
// and allow for expansion when clicked
function bindDraggies( pckry ) {
  var itemElems = pckry.getItemElements();

  var onDragEnd = function( dragger ) {
    // compare movement
    var drag = dragger.dragPoint;
    if ( drag.x !== 0 || drag.y !== 0 ) {
      return;
    }
    // dragger didn't move
    var isExpanded = classie.has( dragger.element, 'expanded' );
    classie.toggle( dragger.element, 'expanded' );
    if ( !isExpanded ) {
      pckry.unstamp( dragger.element ); // HACK
      pckry.fit( dragger.element );
    } else {
      pckry.layout();
    }
  };

  for ( var j=0, len = itemElems.length; j < len; j++ ) {
    var itemElem = itemElems[j];
    var draggie = new Draggabilly( itemElem );
    pckry.bindDraggabillyEvents( draggie );
    draggie.on( 'dragEnd', onDragEnd );
  }
}


PS.index = function() {

  // ----- hero ----- //

  ( function() {
    var hero = document.querySelector('#hero');
    var container = hero.querySelector('.packery');
    var pckry = new Masonry( container, {
      itemSelector: '.item',
      stamped: '.stamp',
      gutter: 2,
      containerStyle: null
    });

    addItems( pckry, hero.offsetHeight + 40, true );
  })();

  // ----- masonry ----- //
  
  ( function() {
    var container = document.querySelector('#hero-demos .masonry .packery');
    var pckry = new Masonry( container, {
      itemSelector: '.item',
      columnWidth: '.grid-sizer'
    });
    bindDraggies( pckry );
  })();

  // ----- ridiculous ----- //

  ( function() {
    var container = document.querySelector('.ridiculous .packery');
    var fragment = document.createDocumentFragment();
    for ( var i=0; i < 12; i++ ) {
      var item = getItem( true );
      fragment.appendChild( item );
    }
    container.appendChild( fragment );
    var pckry = new Masonry( container, {
      gutter: 4
    });
    bindDraggies( pckry );
  })();

  // ----- meticulous ----- //

  ( function() {
    var container = document.querySelector('.meticulous .packery');
    var pckry = new Masonry( container, {
      itemSelector: '.item',
      columnWidth: '.grid-sizer',
      rowHeight: 44
    });
    bindDraggies( pckry );
  })();

  // ----- basically ----- //

  ( function() {
    var container = document.querySelector('#hero-demos .basically .packery');
    var pckry = new Masonry( container, {
      rowHeight: 40,
      gutter: 4
    });
    bindDraggies( pckry );
  })();

  // ----- scroll stuff ----- //

  ( function() {
    var pageNav = document.querySelector('#page-nav');
    var isAtTop = true;
    // add initial class
    var style = getStyle( pageNav );
    if ( style.position === 'absolute' || style.position === 'fixed' ) {
      classie.add( pageNav, 'is-at-top' );
    }
    // only add scroll event if fixed
    if ( style.position !== 'fixed' ) {
      return;
    }

    var navY = getSize( pageNav ).height / 2 + parseInt( style.top, 10 );
    var installHeader = document.querySelector('#install');
    var contentY = installHeader.getBoundingClientRect().top;

    var scrollTimeout;

    // debounce scroll
    eventie.bind( window, 'scroll', function() {
      if ( scrollTimeout ) {
        clearTimeout( scrollTimeout );
      }
      scrollTimeout = setTimeout( onDebounceScroll, 100 );
    });

    function onDebounceScroll() {
      var wasAtTop = isAtTop;
      isAtTop = window.scrollY + navY < contentY;
      if ( isAtTop !== wasAtTop ) {
        classie[ isAtTop ? 'add' : 'remove' ]( pageNav, 'is-at-top' );
      }
    }
  })();

};

})( window );