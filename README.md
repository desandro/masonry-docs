# Packery Docs

Documentation for Packery, the bin-packing layout library.

This project does _not_ include the source for Packery. That's over in [github.com/desandro/packery](https://github.com/desandro/packery).

## Build

Building these docs requires [Bower](http://twitter.github.com/bower), [Grunt](http://gruntjs.com) and [NPM](http://npmjs.org).

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
