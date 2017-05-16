'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // Default package
    pkg : grunt.file.readJSON('package.json'),

    // Configuration to be run (and then tested).
    yoctohint : {
      all     : [ 'Gruntfile.js', 'tasks/yoctohint.js' ],
      options : {
        pagespeed : {
          config : {},
          enable : false
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Load npm task
  grunt.registerTask('test', [ 'yoctohint' ]);
  grunt.registerTask('default', [ 'test' ]);
};
