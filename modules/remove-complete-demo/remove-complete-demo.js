MD.modules['remove-complete-demo'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var msnry = new Masonry( grid, {
    columnWidth: 60
  });

  // bind listener
  msnry.on( 'removeComplete', function( removedItems ) {
    MD.notify( 'Removed ' + removedItems.length + ' items' );
  });

  eventie.filterBind( grid, 'click', '.grid-item', function( event ) {
    // remove clicked element
    msnry.remove( event.target );
    // layout remaining item elements
    msnry.layout();
  });

};
