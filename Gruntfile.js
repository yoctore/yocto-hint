'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // default package
    pkg       : grunt.file.readJSON('package.json'),
    // Configuration to be run (and then tested).
    yoctohint : {
      options : {
        jshint : {}
      },
      all     : [ 'Gruntfile.js', 'tasks/yoctohint.js' ]
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  // load npm task
  grunt.registerTask('test', [ 'yoctohint' ]);
  grunt.registerTask('default', [ 'test' ]);
};
