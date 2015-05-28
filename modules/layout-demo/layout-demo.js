MD.modules['layout-demo'] = function( elem ) {
  'use strict';

  var $demo = $( elem );

  var grid = elem.querySelector('.grid');

  var msnry = new Masonry( grid, {
    columnWidth: 60
  });

  eventie.filterBind( grid, 'click', '.grid-item', function( event ) {
    classie.toggle( event.target, 'grid-item--gigante' );
    msnry.layout();
  });

};
