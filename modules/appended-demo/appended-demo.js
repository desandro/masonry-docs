MD.modules['appended-demo'] = function( elem ) {
  'use strict';

  var grid = elem.querySelector('.grid');
  
  var msnry = new Masonry( grid, {
    columnWidth: 80
  });

  var appendButton = elem.querySelector('.append-button');
  
  eventie.bind( appendButton, 'click', function() {
    // create new item elements
    var items = [
      MD.getItemElement(),
      MD.getItemElement(),
      MD.getItemElement()
    ];
    // append elements to container
    var fragment = document.createDocumentFragment();
    fragment.appendChild( items[0] );
    fragment.appendChild( items[1] );
    fragment.appendChild( items[2] );
    grid.appendChild( fragment );
    // add and lay out newly appended elements
    msnry.appended( items );
  });

};
