# Masonry Docs

Documentation for Masonry, cascading grid layout library.

This project does _not_ include the source for Masonry. That's over in [github.com/desandro/masonry](https://github.com/desandro/masonry).

## Build

Building these docs requires [Bower](http://bower.io), [Grunt](http://gruntjs.com) and [NPM](http://npmjs.org).

``` bash
npm install
bower install
grunt
```

This will build the docs in `build/`.

Watch for updates to rebuild docs on the fly.

``` bash
grunt default watch
```

Pass `--dev` to build the site with JS and CSS files included separately, un-concatenated, and un-minified.

``` bash
grunt --dev
```
