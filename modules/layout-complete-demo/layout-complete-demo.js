MD.modules['layout-complete-demo'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var msnry = new Masonry( grid, {
    columnWidth: 60
  });

  // bind listener
  msnry.on( 'layoutComplete', function( laidOutItems ) {
    MD.notify( 'Masonry layout completed on ' + laidOutItems.length + ' items' );
  });

  eventie.filterBind( grid, 'click', '.grid-item', function( event ) {
    // change size of item via class
    classie.toggle( event.target, 'grid-item--gigante' );
    msnry.layout();
  });

};
