MD.modules['prepended-demo'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');
  
  var msnry = new Masonry( grid, {
    columnWidth: 80
  });

  var prependButton = elem.querySelector('.prepend-button');
  
  prependButton.addEventListener( 'click', function() {
    // create new item elements
    var items = [
      MD.getItemElement(),
      MD.getItemElement(),
      MD.getItemElement()
    ];
    // prepend elements to container
    var fragment = document.createDocumentFragment();
    fragment.appendChild( items[0] );
    fragment.appendChild( items[1] );
    fragment.appendChild( items[2] );
    grid.insertBefore( fragment, grid.firstChild );
    // add and lay out newly prepended elements
    msnry.prepended( items );
  });

};
