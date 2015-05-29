MD.modules.hero = function( elem ) {
  'use strict';

  var heroGrid = elem.querySelector('.hero-grid');

  var msnry = new Masonry( heroGrid, {
    itemSelector: '.hero-grid__item',
    columnWidth: '.hero-grid__grid-sizer',
    percentPosition: true
  });


  // ----- add example items ----- //

  var examplesData = [
    {
      title: "Erik Johansson",
      url: "http://erikjohanssonphoto.com/work/imagecats/personal/",
      image: "http://i.imgur.com/6Lo8oun.jpg"
    },
    {
      title: "Beyoncé | I Am",
      url: 'http://iam.beyonce.com/',
      image: 'http://i.imgur.com/HDSAMFl.jpg'
    },
    {
      title: "Webster Hall Timeline",
      url: "http://www.websterhall.com/timeline/",
      image: "http://i.imgur.com/VWfCPYx.jpg"
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
      title: "Tumblr Staff: Archive",
      url: "http://staff.tumblr.com/archive",
      image: "http://i.imgur.com/igjvRa3.jpg"
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

  var items = [];
  var fragment = document.createDocumentFragment();
  for ( var i=0, len = examplesData.length; i < len; i++ ) {
    var item = makeExampleItem( examplesData[i] );
    items.push( item );
    fragment.appendChild( item );
  }

  imagesLoaded( fragment ).on( 'progress', function( imgLoad, image ) {
    var item = image.img.parentNode.parentNode;
    heroGrid.appendChild( item );
    msnry.appended( item );
  });


  function makeExampleItem( dataObj ) {
    var item = document.createElement('div');
    item.className = 'hero-grid__item';

    var link = document.createElement('a');
    link.className = 'hero__example-link';
    link.href = dataObj.url;

    var img = document.createElement('img');
    img.className = 'hero__example-link__img';
    img.src = dataObj.image;

    var title = document.createElement('p');
    title.className = 'hero__example-link__title';
    title.textContent = dataObj.title;

    link.appendChild( img );
    link.appendChild( title );
    item.appendChild( link );
    return item;
  }


};
