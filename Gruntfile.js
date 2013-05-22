'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
    'jsmin-sourcemap': {
      all: {
        src: 'lib/*.js',
        dest: 'dist/js/all.min.js',
        destMap: 'dist/js/all.js.map'
      },
    },
    imagemin: {
      dist: {                            
        options: {                       
          optimizationLevel: 3
        },
        files: [{
            expand: true,
            src: 'images/*.{png,jpg,jpeg}',
            dest: 'dist/images'
        }]
      },
    },
    sass: {
      dist: {
        files: {
          'dist/css/styles.css': 'scss/styles.scss'
        }
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadNpmTasks('grunt-jsmin-sourcemap');

  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'sass']);
  grunt.registerTask('ship', ['default', 'imagemin', 'jsmin-sourcemap', 'sass']);
};
