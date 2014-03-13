/**
 * methods page
 */

( function( window ) {

'use strict';

var MD = window.MD;
// var $ = window.jQuery;

var heroContainer;
var heroMasonry;
var loadMoreButton;

// --------------------------  -------------------------- //


MD.index = function() {

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

  loadMoreButton = document.querySelector('#load-more-examples');

};


function getExamples() {

  var items = [];
  var fragment = document.createDocumentFragment();
  var data = examplesData;
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

var examplesData = [
  {
    title: "Erik Johansson",
    url: "http://erikjohanssonphoto.com/work/imagecats/personal/",
    image: "http://i.imgur.com/6Lo8oun.jpg"
  },
  {
    title: "Tumblr Staff: Archive",
    url: "http://staff.tumblr.com/archive",
    image: "http://i.imgur.com/igjvRa3.jpg"
  },
  {
    title: "Halcyon theme",
    url: "http://halcyon-theme.tumblr.com/",
    image: "http://i.imgur.com/A1RSOhg.jpg"
  },
  {
    title: "RESIZE.THATSH.IT",
    url: "http://resize.thatsh.it/",
    image: "http://i.imgur.com/00xWxLG.png"
  },
  {
    title: "Vox Media",
    url: "http://www.voxmedia.com",
    image: "http://i.imgur.com/xSiTFij.jpg"
  },
  {
    title: "Kristian Hammerstad",
    url: "http://www.kristianhammerstad.com/",
    image: "http://i.imgur.com/Zwd7Sch.jpg"
  },
  {
    title: "Loading Effects for Grid Items | Demo 2",
    url: "http://tympanus.net/Development/GridLoadingEffects/index2.html",
    image: "http://i.imgur.com/iFBSB1t.jpg"
  }
];

function makeExampleItem( dataObj ) {
  var item = document.createElement('div');
  item.className = 'hero-item has-example is-hidden';
  var link = document.createElement('a');
  link.href = dataObj.url;
  var img = document.createElement('img');
  img.src = dataObj.image;
  var title = document.createElement('p');
  title.className = 'example-title';
  title.textContent = dataObj.title;
  link.appendChild( img );
  link.appendChild( title );
  item.appendChild( link );
  return item;
}

})( window );