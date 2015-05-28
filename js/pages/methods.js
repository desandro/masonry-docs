/**
 * methods page
 */

( function( window ) {

'use strict';

var MD = window.MD;

function getItemElement() {
  var elem = document.createElement('div');
  var wRand = Math.random();
  var hRand = Math.random();
  var widthClass = wRand > 0.92 ? 'w4' : wRand > 0.8 ? 'w3' : wRand > 0.6 ? 'w2' : '';
  var heightClass = hRand > 0.85 ? 'h4' : hRand > 0.6 ? 'h3' : hRand > 0.35 ? 'h2' : '';
  elem.className = 'item ' + widthClass + ' ' + heightClass;
  return elem;
}

MD.methodsYeah = function() {

  // ----- destroy demo ----- //

  ( function() {
    var demo = document.querySelector('#destroy-demo');
    var container = demo.querySelector('.masonry');
    var button = demo.querySelector('button');
    var msnry = new Masonry( container, {
      columnWidth: 60
    });
    var isActive = true;

    eventie.bind( button, 'click', function() {
      if ( isActive ) {
        msnry.destroy();
      } else {
        msnry = new Masonry( container );
      }
      isActive = !isActive;
    });
  })();

  // ----- prepended ----- //

  ( function() {
    var demo = document.querySelector('#prepended-demo');
    var container = demo.querySelector('.masonry');
    var button = demo.querySelector('button');
    var msnry = new Masonry( container, {
      columnWidth: 60
    });

    eventie.bind( button, 'click', function() {
      // create new item elements
      var elems = [];
      var fragment = document.createDocumentFragment();
      for ( var i = 0; i < 3; i++ ) {
        var elem = getItemElement();
        fragment.appendChild( elem );
        elems.push( elem );
      }
      // prepend elements to container
      container.insertBefore( fragment, container.firstChild );
      // add and lay out newly prepended elements
      msnry.prepended( elems );
    });
  })();


  // ----- remove demo ----- //

  ( function() {
    var container = document.querySelector('#remove-demo .masonry');
    var msnry = new Masonry( container, {
      columnWidth: 60
    });

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      if ( !classie.has( event.target, 'item' ) ) {
        return;
      }
      // remove clicked element
      msnry.remove( event.target );
      // layout remaining item elements
      msnry.layout();
    });
  })();

};

})( window );
