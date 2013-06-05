/**
 * methods page
 */

( function( window ) {

'use strict';

var PS = window.PS;

function getItemElement() {
  var elem = document.createElement('div');
  var wRand = Math.random();
  var hRand = Math.random();
  var widthClass = wRand > 0.85 ? 'w4' : wRand > 0.7 ? 'w2' : '';
  var heightClass = hRand > 0.85 ? 'h4' : hRand > 0.7 ? 'h2' : '';
  elem.className = 'item ' + widthClass + ' ' + heightClass;
  return elem;
}

PS.methods = function() {

  // ----- appended ----- //

  ( function() {
    var demo = document.querySelector('#appended-demo');
    var container = demo.querySelector('.packery');
    var button = demo.querySelector('button');
    var pckry = new Packery( container );

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
      pckry.appended( elems );
    });
  })();

  // ----- destroy demo ----- //

  ( function() {
    var demo = document.querySelector('#destroy-demo');
    var container = demo.querySelector('.packery');
    var button = demo.querySelector('button');
    var pckry = new Packery( container );
    var isActive = true;

    eventie.bind( button, 'click', function() {
      if ( isActive ) {
        pckry.destroy();
      } else {
        pckry = new Packery( container );
      }
      isActive = !isActive;
    });
  })();

  // ----- fit demo ----- //

  ( function() {
    var container = document.querySelector('#fit-demo .packery');
    var pckry = new Packery( container );

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      var target = event.target;
      if ( !classie.has( target, 'item' ) ) {
        return;
      }

      var isGigante = classie.has( target, 'gigante' );
      classie.toggleClass( target, 'gigante' );

      if ( isGigante ) {
        // if shrinking, just layout
        pckry.layout();
      } else {
        // if expanding, fit it
        pckry.fit( target );
      }
    });
  })();


  // ----- fit position ----- //

  ( function() {
    var container = document.querySelector('#fit-position-demo .packery');
    var pckry = new Packery( container );

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      var target = event.target;
      if ( !classie.has( target, 'item' ) ) {
        return;
      }

      pckry.fit( target, 40, 40 );
    });
  })();

  // ----- layout demo ----- //

  ( function() {
    var container = document.querySelector('#layout-demo .packery');
    var pckry = new Packery( container );

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      if ( !classie.has( event.target, 'item' ) ) {
        return;
      }
      // change size of item via class
      classie.toggle( event.target, 'gigante' );
      // trigger layout
      pckry.layout();
    });
  })();

  // ----- prepended ----- //

  ( function() {
    var demo = document.querySelector('#prepended-demo');
    var container = demo.querySelector('.packery');
    var button = demo.querySelector('button');
    var pckry = new Packery( container );

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
      pckry.prepended( elems );
    });
  })();


  // ----- stamp demo ----- //

  ( function() {
    var demo = document.querySelector('#stamp-demo');
    var stampElem = demo.querySelector('.stamp');
    var button = demo.querySelector('button');
    var pckry = new Packery( demo.querySelector('.packery'), {
      itemSelector: '.item'
    });
    var isStamped = false;

    eventie.bind( button, 'click', function() {
      // stamp or unstamp element
      if ( isStamped ) {
        pckry.unstamp( stampElem );
      } else {
        pckry.stamp( stampElem );
      }
      // trigger layout
      pckry.layout();
      isStamped = !isStamped;
    });
  })();

  // ----- remove demo ----- //

  ( function() {
    var container = document.querySelector('#remove-demo .packery');
    var pckry = new Packery( container );

    eventie.bind( container, 'click', function( event ) {
      // don't proceed if item was not clicked on
      if ( !classie.has( event.target, 'item' ) ) {
        return;
      }
      // remove clicked element
      pckry.remove( event.target );
      // layout remaining item elements
      pckry.layout();
    });
  })();

};

})( window );
