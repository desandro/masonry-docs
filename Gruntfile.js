
// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  // get banner comment
  var banner = ( function() {
    var src = grunt.file.read('bower_components/masonry/masonry.js');
    var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
    var matches = src.match( re );
    return matches[0].replace( 'Masonry', 'Masonry PACKAGED' );
  })();

  grunt.initConfig({
    // global settings
    namespace: 'masonry',
    dataDir: '_tasks/data',

    jshint: {
      docs: [ 'js/controller.js', 'js/*/*.js'  ],
      options: grunt.file.readJSON('js/.jshintrc')
    },

    // create masonry.pkgd.js
    requirejs: {
      pkgd: {
        options: {
          baseUrl: 'bower_components',
          include: [
            'jquery-bridget/jquery.bridget',
            'masonry/masonry'
          ],
          paths: {
            jquery: 'empty:'
          },
          out: 'build/masonry.pkgd.js',
          optimize: 'none',
          wrap: {
            start: banner
          }
        }
      }
    },

    concat: {
      // masonry-docs.js
      'docs-js': {
        src: [ 'js/controller.js', 'js/pages/*.js' ],
        dest: 'build/js/masonry-docs.js'
      },
      // masonry-docs.css
      'docs-css': {
        src: [ 'bower_components/normalize-css/normalize.css', 'css/*.css', '!css/masonry-docs.css' ],
        dest: 'build/css/masonry-docs.css'
      }
    },

    uglify: {
      pkgd: {
        files: {
          'build/masonry.pkgd.min.js': [ 'build/masonry.pkgd.js' ]
        },
        options: {
          banner: banner
        }
      },
      js: {
        files: {
          'build/js/masonry-docs.min.js': [ 'build/js/masonry-docs.js' ]
        }
      }
    },

    // ----- handlebars templating ----- //
    template: {
      docs: {
        files: {
          'build/': '_content/*'
        },
        options: {
          templates: '_templates/*.mustache',
          defaultTemplate: 'page',
          partialFiles: {
            'submitting-issues': 'bower_components/masonry/CONTRIBUTING.mdown'
          }
        }
      }
    },

    // ----- copy ----- //
    copy: {
      "public": {
        files: [
          {
            expand: true, // enable dynamic options
            cwd: 'public/', // set cwd, excludes it in build path
            src: [ '**', '!.htaccess' ],
            dest: 'build/'
          }
        ]
      },
      css: {
        files: [
          {
            expand: true, // enable dynamic options
            cwd: 'css/', // set cwd, excludes it in build path
            src: [ '*' ],
            dest: 'build/css/'
          }
        ]
      },
      js: {
        files: [
          {
            expand: true, // enable dynamic options
            cwd: 'js/', // set cwd, excludes it in build path
            src: [ '**' ],
            dest: 'build/js/'
          }
        ]
      },
      bowerSources: {
        // additional sources will be set in bower-list-map
        src: [ 'bower_components/jquery/jquery.min.js' ],
        dest: 'build/'
      }
    },


    watch: {
      content: {
        files: [ '_content/*', '_templates/*.mustache' ],
        tasks: [ 'template' ]
      },
      "public": {
        files: [ 'public/**' ],
        tasks: [ 'copy:public' ]
      },
      css: {
        files: [ 'css/*' ],
        tasks: [ 'copy:css' ]
      },
      js: {
        files: [ 'js/**' ],
        tasks: [ 'copy:js' ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-fizzy-docs');

  // remove AMD module name
  grunt.registerTask( 'requirejs-extra', function() {
    var outFile = grunt.config.get('requirejs.pkgd.options.out');
    var contents = grunt.file.read( outFile );
    contents = contents.replace( "'masonry/masonry',", '' );
    grunt.file.write( outFile, contents );
    grunt.log.writeln( 'Edited ' + outFile );
  });

  grunt.registerTask( 'default', [
    'jshint',
    'int-bower',
    'requirejs',
    'requirejs-extra',
    'concat',
    'uglify',
    'template',
    'copy'
  ]);

};
