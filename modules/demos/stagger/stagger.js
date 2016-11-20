MasonryDocs.stagger = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var msnry = new Masonry( grid, {
    columnWidth: 80,
    stagger: 30,
  });

  filterBindEvent( grid, 'click', '.grid-item', function( event ) {
    event.target.classList.toggle('grid-item--gigante');
    msnry.layout();
  });

};
