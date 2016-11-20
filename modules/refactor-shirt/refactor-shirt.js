MasonryDocs['refactor-shirt'] = function( elem ) {
  'use strict';

  var endDate = new Date( 2016, 1, 10 );
  var days = Math.round( ( endDate - new Date() ) / ( 1000 * 60 * 60 * 24 ) );
  elem.querySelector('.refactor-shirt__title').textContent = 'Refactor shirts. ' +
    'Only on sale for ' + days + ' more days.';

};
