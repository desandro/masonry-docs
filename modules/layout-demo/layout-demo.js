MD.modules['layout-demo'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var msnry = new Masonry( grid, {
    columnWidth: 80
  });

  filterBindEvent( grid, 'click', '.grid-item', function( event ) {
    event.target.classList.toggle('grid-item--gigante');
    msnry.layout();
  });

};
