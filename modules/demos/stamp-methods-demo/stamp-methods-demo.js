MasonryDocs['stamp-methods-demo'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var msnry = new Masonry( grid, {
    itemSelector: '.grid-item',
    columnWidth: 80
  });

  var stampElem = grid.querySelector('.stamp');
  var isStamped = false;

  var stampButton = elem.querySelector('.stamp-button');

  stampButton.addEventListener( 'click', function() {
    // stamp or unstamp element
    if ( isStamped ) {
      msnry.unstamp( stampElem );
    } else {
      msnry.stamp( stampElem );
    }
    // trigger layout
    msnry.layout();
    isStamped = !isStamped;
  });

};
