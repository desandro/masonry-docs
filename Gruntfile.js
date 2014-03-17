/*jshint node: true, undef: true, unused: true */

// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  grunt.initConfig({
    // global settings
    namespace: 'masonry',
    dataDir: '_tasks/data',

    jshint: {
      docs: [ 'js/controller.js', 'js/*/*.js'  ],
      options: grunt.file.readJSON('js/.jshintrc')
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
      docs: {
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
            'submitting-issues': '../masonry/CONTRIBUTING.mdown'
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
      pkgd: {
        files: [
          {
            expand: true, // enable dynamic options
            cwd: 'bower_components/masonry/dist/', // set cwd, excludes it in build path
            src: [ '*' ],
            dest: 'build/'
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
  grunt.loadNpmTasks('grunt-fizzy-docs');

  grunt.registerTask( 'default', [
    'jshint',
    'int-bower',
    'concat',
    'uglify',
    'template',
    'copy'
  ]);

};
