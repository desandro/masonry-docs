MD.modules['remove-demo'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var msnry = new Masonry( grid, {
    columnWidth: 80
  });

  eventie.filterBind( grid, 'click', '.grid-item', function( event ) {
    // remove clicked element
    msnry.remove( event.target );
    // layout remaining item elements
    msnry.layout();
  });

};
