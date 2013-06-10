/**
 * events page
 */

( function( window ) {

'use strict';

var MD = window.MD;


// -------------------------- notify -------------------------- //

function timeStamp() {
  var now = new Date();
  var min = now.getMinutes();
  min = min < 10 ? '0' + min : min;
  var seconds = now.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;
  return [ now.getHours(), min, seconds ].join(':');
}

function notify( message ) {
  MD.notify( message + ' at ' + timeStamp(), true );
}

MD.events = function() {

  // ----- layoutComplete demo ----- //

  ( function() {
    var container = document.querySelector('#layout-complete-demo .masonry');
    var msnry = new Masonry( container, {
      columnWidth: 60
    });
    msnry.on( 'layoutComplete', function( msnryInstance, laidOutItems ) {
      notify( 'Masonry layout completed on ' + laidOutItems.length + ' items' );
    });

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      if ( !classie.has( event.target, 'item' ) ) {
        return;
      }
      // change size of item via class
      classie.toggle( event.target, 'gigante' );
      // trigger layout
      msnry.layout();
    });
  })();

  // ----- removeComplete demo ----- //

  ( function() {
    var container = document.querySelector('#remove-complete-demo .masonry');
    var msnry = new Masonry( container, {
      columnWidth: 60
    });

    msnry.on( 'removeComplete', function( msnryInstance, items ) {
      notify( 'Removed ' + items.length + ' items' );
    });

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      if ( !classie.has( event.target, 'item' ) ) {
        return;
      }
      // remove clicked element
      msnry.remove( event.target );
    });
  })();

};

})( window );
