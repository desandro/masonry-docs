MD.modules['animate-item-size'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var msnry = new Masonry( grid, {
    columnWidth: 60
  });

  filterBindEvent( grid, 'click', '.animate-item-size-item__content', function( event ) {
    classie.toggleClass( event.target.parentNode, 'is-expanded' );
    msnry.layout();
  });

};
