MD.modules['imagesloaded-progress'] = function( elem ) {
  'use strict';

  var msnry = new Masonry( elem, {
    itemSelector: '.grid-image-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
  });

  // layout Masonry after each image loads
  var imgLoad = imagesLoaded( elem );
  imgLoad.on( 'progress', function() {
    msnry.layout();
  });

};
