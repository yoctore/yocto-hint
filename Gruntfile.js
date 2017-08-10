'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // Default package
    pkg       : grunt.file.readJSON('package.json'),
    yoctohint : {
      json : [
        'package.json'
      ],
      node : [
        'Gruntfile.js',
        'tasks/yoctohint.js'
      ]
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Load npm task
  grunt.registerTask('test', [ 'yoctohint' ]);
  grunt.registerTask('default', [ 'test' ]);
};
