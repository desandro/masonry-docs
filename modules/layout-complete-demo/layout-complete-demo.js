MD.modules['layout-complete-demo'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var msnry = new Masonry( grid, {
    columnWidth: 80
  });

  // bind listener
  msnry.on( 'layoutComplete', function( laidOutItems ) {
    MD.notify( 'Masonry layout completed on ' + laidOutItems.length + ' items' );
  });

  filterBindEvent( grid, 'click', '.grid-item', function( event ) {
    // change size of item via class
    event.target.classList.toggle('grid-item--gigante');
    msnry.layout();
  });

};
