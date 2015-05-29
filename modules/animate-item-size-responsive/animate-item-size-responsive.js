MD.modules['animate-item-size-responsive'] = function( elem ) {
  'use strict';

  var transitionProp = getStyleProperty('transition');
  var transitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'otransitionend',
    transition: 'transitionend'
  }[ transitionProp ];

  // ----- demo ----- //

  var grid = elem.querySelector('.grid');

  var msnry = new Masonry( grid, {
    itemSelector: '.animate-item-size-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
  });

  eventie.filterBind( grid, 'click', '.animate-item-size-item__content', function() {
    /*jshint unused: false */
    var itemContent = this;
    setItemContentPixelSize( itemContent );

    var itemElem = itemContent.parentNode;
    classie.toggleClass( itemElem, 'is-expanded' );

    // force redraw
    var redraw = itemContent.offsetWidth;
    // renable default transition
    itemContent.style[ transitionProp ] = '';

    addTransitionListener( itemContent );
    setItemContentTransitionSize( itemContent, itemElem );

    msnry.layout();
  });

  function setItemContentPixelSize( itemContent ) {
    var previousContentSize = getSize( itemContent );
    // disable transition
    itemContent.style[ transitionProp ] = 'none';
    // set current size in pixels
    itemContent.style.width = previousContentSize.width + 'px';
    itemContent.style.height = previousContentSize.height + 'px';
  }

  function addTransitionListener( itemContent ) {
    if ( !transitionProp ) {
      return;
    }
    // reset 100%/100% sizing after transition end
    var onTransitionEnd = function() {
      itemContent.style.width = '';
      itemContent.style.height = '';
      itemContent.removeEventListener( transitionEndEvent, onTransitionEnd, false );
    };
    itemContent.addEventListener( transitionEndEvent, onTransitionEnd, false );
  }

  function setItemContentTransitionSize( itemContent, itemElem ) {
    // set new size
    var size = getSize( itemElem );
    itemContent.style.width = size.width + 'px';
    itemContent.style.height = size.height + 'px';
  }

};
