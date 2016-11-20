MasonryDocs['destroy-demo'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');

  var masonryOptions = {
    columnWidth: 80
  };

  // init Masonry
  var msnry = new Masonry( grid, masonryOptions );
  var isActive = true;

  var toggleButton = elem.querySelector('.toggle-button');

  toggleButton.addEventListener( 'click', function() {
    if ( isActive ) {
      msnry.destroy();
    } else {
      // re-initialize
      msnry = new Masonry( grid, masonryOptions );
    }
    // set flag
    isActive = !isActive;
  });

};
