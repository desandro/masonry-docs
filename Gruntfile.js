
// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  // get banner comment from draggabilly.js
  var banner = ( function() {
    var src = grunt.file.read('components/masonry/masonry.js');
    var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
    var matches = src.match( re );
    return matches[0].replace( 'Masonry', 'Masonry PACKAGED' );
  })();

  grunt.initConfig({

    jshint: {
      docs: [ 'js/controller.js', 'js/*/*.js',  ],
      options: grunt.file.readJSON('js/.jshintrc')
    },

    concat: {
      js: {
        src: [ 'js/controller.js', 'js/pages/*.js' ],
        dest: 'js/masonry-docs.js'
      },
      pkgd: {
        // src will be set in package-sources task
        dest: 'masonry.pkgd.js',
        options: {
          banner: banner
        }
      },
      css: {
        src: [ 'components/normalize-css/normalize.css', 'css/*.css', '!css/masonry-docs.css' ],
        dest: 'css/masonry-docs.css'
      }
    },

    uglify: {
      pkgd: {
        files: {
          'masonry.pkgd.min.js': [ 'masonry.pkgd.js' ]
        },
        options: {
          banner: banner
        }
      },
      js: {
        files: {
          // 'js/masonry-site.min.js' will be set in bower-list-map
        }
      }
    },

    // ----- handlebars templating ----- //
    hbarz: {
      docs: {
        files: {
          './': '_content/*'
        },
        options: {
          templates: '_templates/*.mustache',
          defaultTemplate: 'page'
        }
      }
    },

    watch: {
      content: {
        files: [ 'content/*', 'templates/*.mustache' ],
        tasks: [ 'bower-list-map', 'hbarz' ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // load all tasks in tasks/
  grunt.loadTasks('_tasks/');

  grunt.registerTask( 'default', [
    'jshint',
    'bower-list-map',
    'package-sources',
    'concat',
    'uglify',
    'hbarz'
  ]);

};
