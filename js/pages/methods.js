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

MD.methods = function() {

  // ----- appended ----- //

  ( function() {
    var demo = document.querySelector('#appended-demo');
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
      // append elements to container
      container.appendChild( fragment );
      // add and lay out newly appended elements
      msnry.appended( elems );
    });
  })();

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

  // ----- layout demo ----- //

  ( function() {
    var container = document.querySelector('#layout-demo .masonry');
    var msnry = new Masonry( container, {
      columnWidth: 60
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


  // ----- stamp demo ----- //

  ( function() {
    var demo = document.querySelector('#stamp-demo');
    var stampElem = demo.querySelector('.stamp');
    var button = demo.querySelector('button');
    var msnry = new Masonry( demo.querySelector('.masonry'), {
      columnWidth: 60,
      itemSelector: '.item'
    });
    var isStamped = false;

    eventie.bind( button, 'click', function() {
      // stamp or unstamp element
      if ( isStamped ) {
        msnry.unstamp( stampElem );
      } else {
        msnry.stamp( stampElem );
      }
      // trigger layout
      msnry.layout();
      isStamped = !isStamped;
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
