/**
 * methods page
 */

( function( window ) {

'use strict';

var PS = window.PS;

// --------------------------  -------------------------- //


PS.index = function() {

  // ----- hero ----- //

  ( function() {
    var hero = document.querySelector('#hero');
    var container = hero.querySelector('.hero-masonry');
    new Masonry( container, {
      itemSelector: '.hero-item',
      columnWidth: '.grid-sizer'
    });
  })();

};

})( window );