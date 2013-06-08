/**
 * methods page
 */

( function( window ) {

'use strict';

var PS = window.PS;
var $ = window.jQuery;

var heroContainer;
var heroMasonry;

// --------------------------  -------------------------- //


PS.index = function() {

  // ----- hero ----- //

  ( function() {
    var hero = document.querySelector('#hero');
    heroContainer = hero.querySelector('.hero-masonry');
    heroMasonry = new Masonry( heroContainer, {
      itemSelector: '.hero-item',
      columnWidth: '.grid-sizer'
    });

    getExamples();

  })();

};


var exampleOffset = 0;
var isLoading = false;

function getExamples() {
  // don't load more stuff if already loading
  if ( isLoading ) {
    return;
  }

  isLoading = true;
  $.getJSON('http://zootool.com/api/users/items/?' +
      'username=desandro' +
      '&apikey=8b604e5d4841c2cd976241dd90d319d7' +
      '&tag=bestofmasonry' +
      '&offset=' + exampleOffset +
      '&callback=?'
    )
    .always( function() {
      isLoading = false;
    })
    .fail( getExamplesFail )
    .done( getExamplesSuccess );
}

function getExamplesFail( data ) {
  console.log('fail', data );
}

function getExamplesSuccess( data ) {
  console.log('success', data );
  exampleOffset = data.length;
  var items = [];
  var fragment = document.createDocumentFragment();
  for ( var i=0, len = data.length; i < len; i++ ) {
    var item = makeExampleItem( data[i] );
    items.push( item );
    fragment.appendChild( item );
  }

  imagesLoaded( fragment )
    .on( 'progress', function( imgLoad, image ) {
      var item = image.img.parentNode.parentNode;
      // debugger
      // console.dir( image.img.parentNode );
      heroContainer.appendChild( item );
      heroMasonry.appended( item );
    });

}

function makeExampleItem( dataObj ) {
  var item = document.createElement('div');
  item.className = 'hero-item has-example is-hidden';
  var link = document.createElement('a');
  link.href = dataObj.url;
  var img = document.createElement('img');
  img.src = dataObj.image.replace('/l.', '/m.');
  var title = document.createElement('p');
  title.className = 'example-title';
  title.textContent = dataObj.title;
  link.appendChild( img );
  link.appendChild( title );
  item.appendChild( link );
  return item;
}

})( window );