/*
 * grunt-maze
 * https://github.com/jackcviers/lambdajam2013
 *
 * Copyright (c) 2013 Jack Viers and Daniel Santa Cruz
 * Licensed under the APACHE license.
 */

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },
    coffeeify: {
      main: {
        files: [
          {
            src: ['src/coffeescript/*.coffee'],
            dest: 'index.js'
          }
        ]
      }
    },
    coffee: {
      options: {
        bare: false
      },
      main: {
        files: [
          {
            src: ['src/coffeescript/*.coffee'],
            dest: 'lib/main.js'
          }
        ]
      },
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-coffeeify');
  

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint','coffee', 'coffeeify']);

};
