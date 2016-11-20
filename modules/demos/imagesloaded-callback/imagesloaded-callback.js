MasonryDocs['imagesloaded-callback'] = function( elem ) {
  'use strict';

  imagesLoaded( elem, function() {
    new Masonry( elem, {
      itemSelector: '.grid-image-item',
      columnWidth: '.grid-sizer',
      percentPosition: true,
    });
  });

};
