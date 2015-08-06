/*
 * grunt-yocto-norme
 * 
 *
 * Copyright (c) 2015 Mathieu ROBERT
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Configuration to be run (and then tested).
    yoctohint : {
      options: {
        jshint : {
        }
      },
      all : [ 'test/test-plugin.js', 'tasks/yocto_norme.js' ]
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['yoctohint']);
};
