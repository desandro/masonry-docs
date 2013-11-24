
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

    jshint: {
      docs: [ 'js/controller.js', 'js/*/*.js'  ],
      options: grunt.file.readJSON('js/.jshintrc')
    },

    // create masonry.require.js, later concated into masonry.pkgd.js
    requirejs: {
      pkgd: {
        options: {
          baseUrl: 'bower_components',
          include: [
            'masonry/masonry'
          ],
          out: 'masonry.require.js',
          optimize: 'none'
        }
      }
    },

    concat: {
      // masonry.pkgd.js
      pkgd: {
        src: [
          'bower_components/jquery-bridget/jquery.bridget.js',
          'masonry.require.js'
        ],
        dest: 'build/masonry.pkgd.js',
        options: {
          banner: banner
        }
      },
      // masonry-docs.js
      js: {
        src: [ 'js/controller.js', 'js/pages/*.js' ],
        dest: 'build/js/masonry-docs.js'
      },
      // masonry-docs.css
      css: {
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
          // 'build/js/masonry-site.min.js' will be set in bower-list-map
        }
      }
    },

    // ----- handlebars templating ----- //
    hbarz: {
      docs: {
        files: {
          'build/': '_content/*'
        },
        options: {
          templates: '_templates/*.mustache',
          defaultTemplate: 'page'
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
        src: [ 'components/jquery/jquery.min.js' ],
        dest: 'build/'
      }
    },


    watch: {
      content: {
        files: [ '_content/*', '_templates/*.mustache' ],
        tasks: [ 'bower-list-map', 'hbarz' ]
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
  // load all tasks in tasks/
  grunt.loadTasks('_tasks/');

  grunt.registerTask( 'default', [
    'jshint',
    'bower-list-map',
    'requirejs',
    'concat',
    'uglify',
    'hbarz',
    'copy'
  ]);

};
