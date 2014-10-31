module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      js: {
        src: ['_src/js/jquery.js', '_src/js/*.js'],
        dest: '_tmp/all.js'
      },
      css: {
        src: '_src/css/*.css',
        dest: '_tmp/all.css'
      }
    },

    uglify: {
      js: {
        src: '_tmp/all.js',
        dest: 'js/min.js'
      }
    },

    uncss: {
      dist: {
        files: {
          '_tmp/tidy.css': ['_src/index.html']
        }
      }
    },

    cssmin: {
      css:{
        src: '_tmp/tidy.css',
        dest: 'css/min.css'
      }
    },

    processhtml: {
      dist: {
        files: {
          '_tmp/index.html': ['_src/index.html']
        }
      }
    },

    htmlmin: {
      html: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'index.html': '_tmp/index.html'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', ['concat', 'uglify', 'uncss', 'cssmin', 'processhtml', 'htmlmin']);

};
