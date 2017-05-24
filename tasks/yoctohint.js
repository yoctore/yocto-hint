'use strict';

var _         = require('lodash');
var hooker    = require('hooker');
var chalk     = require('chalk');
var path      = require('path');
var semver    = require('semver');
var timegrunt = require('time-grunt');

/**
 * Default export for grunt yocto-norme-plugin
 *
 * @param {string} grunt default grunt instance to use on current module
 * @return {function} hinter task module
 */
module.exports = function (grunt) {
  // Save current path
  var cwd = process.cwd();

  // Default state, by default is a success, if any error occured
  var globalState = true;
  
  // Default yocto config for jshint and jscs code style
  var defaultOptions = {
    eslint : {
      options : {
        cache       : false,
        configFile  : [ __dirname, '/yocto-eslintrc.yaml' ].join('/'),
        fix         : false,
        format      : 'stylish',
        maxWarnings : 0,
        quiet       : false,
        rules       : {}
      },
      target : []
    },
    nsp : {
      package : grunt.file.readJSON([ process.cwd(), 'package.json' ].join('/'))
    },
    pagespeed : {}
  };

  // Shrinkwrap file path
  var shrinkwrap = [ process.cwd(), 'npm-shrinkwrap.json' ].join('/');
  var nsp        = defaultOptions.nsp;

  // Require external module time grunt to get metrics on execution task
  timegrunt(grunt);

  // Nsp shrinkwrap exists ?
  if (grunt.file.exists(shrinkwrap)) {
    // Shrinkwrap data
    nsp = _.merge(nsp, {
      shrinkwrap : JSON.parse(grunt.file.read(shrinkwrap))
    });
  }

  // Append nsp on hint
  grunt.config.set('nsp', nsp);

  // Append default options to grunt config
  grunt.config.set('eslint', defaultOptions.eslint);


  grunt.registerTask('yoctohint:nspcheckeer', 'Main checker for nsp security rules', function() {
    
  });

  // Create my main task to process all check we need
  grunt.registerTask('yoctohint:hintchecker', 'My hint checker', function () {
    // Current internal Task
    var currentTask;

    // Filter task to get correct task to process.
    // Keep safe all other task in grunt config
    var tasks = _.filter(Object.keys(grunt.config.data), function (key) {
      return key === 'eslint' || key === 'nsp';
    });

    // Hook grunt task execution
    hooker.hook(grunt.task, 'runTaskFn', {
      pre : function (context) {
        if (!_.isUndefined(currentTask)) {
          // True indicates the task has finished successfully.
          currentTask = true;
        }
        currentTask = context.nameArgs;
      }
    });

    // Hook into the success / fail writer.
    hooker.hook(grunt.log.writeln(), [ 'success', 'fail' ], function (res) {
      // Check done or aborted
      var done    = res === 'Done, without errors.';
      var warning = res === 'Done, but with warnings.';
      var aborted = res === 'Aborted due to warnings.';
      var error   = warning || aborted;
      var state   = error ? 'error' : 'success';
      var arts;
      var artPath;
      var sMsg;
console.log(state);
      // Default message config
      var cMsg = {
        level : error ? 'warn' : 'ok',
        msg   : error ? 'Please correct your code !!! ' : 'Good Job. Padawan !!'
      };

      // Is finish ??
      if (done || error) {
        if (!_.isUndefined(currentTask)) {
          // Need to set state before continue
          currentTask = error;

          // Main try catch to any errors
          try {
            // Get file path of art path
            artPath = [ __dirname, 'art', 'art.json' ].join('/');

            // Getting file exists ?
            if (!grunt.file.exists(artPath)) {
              throw [ 'art config file"', artPath, '"not found.' ].join(' ');
            }

            // Select correct arts file content to print
            arts = JSON.parse(grunt.file.read(artPath));

            // Define end state
            sMsg = {
              color : error ? 'red' : 'green',
              file  : _.map(arts[state], function (art) {
                return [ __dirname, 'art', state, art ].join('/');
              })
            };

            // Build message file
            sMsg.file = sMsg.file[_.random(0, sMsg.file.length - 1)];

            // Log message to console
            console.log(chalk[sMsg.color](grunt.file.read(sMsg.file)));
          } catch (e) {
            // Log exeption, but it produces by art config
            grunt.log.warn([ 'Plugin error.', e ].join(' '));

            // Need to log end message with custom param
            grunt.log[cMsg.level](cMsg.msg);
          }
        }
      }
    });

    // Run each given task
    _.each(tasks, function (task) {
      grunt.task.run(task);
    });
  });

  // Register default plugin process
  grunt.registerMultiTask('yoctohint', 'Manage and process code usage on yocto.', function () {
    // Retrieve current options
    var options = this.options();

    // We need to set some default before start the main process
    options.eslint = options.eslint || {};
    options.eslint.rules = options.eslint.rules || {};
    options.eslint.env = options.eslint.env || {};

    // ES6 is enabled ?
    if (!options.eslint.env.es6) {
      // In case of ES6 env is not specified we need to remove ES6 rules to keep safe our validator
      _.set(defaultOptions.eslint.options.rules, 'no-var', 'off');
    }

    // Filter file and return correct file path
    this.data = this.filesSrc.map(function (filepath) {
      // File is exists ?
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn([ 'Source file"', filepath, '"not found.' ].join(' '));

        // Bash value returning false
        return false;
      }

      // Notify to console
      grunt.log.ok([ 'Source file "', filepath, '"exists. adding on filter list.' ].join(' '));

      // Return file path
      return filepath;
    });

    // Has data ?
    if (!_.isEmpty(this.data)) {
      // Notify console
      grunt.log.ok([
        this.data.length, [ 'file', this.data.length > 1 ? 's' : '' ].join(''),
        'found. Adding on hinter list.'
      ].join(' '));

      // Assign default options to config file
      defaultOptions.eslint.target = this.data;

      // Merge config data to grunt config
      grunt.config.merge('eslint', defaultOptions.eslint);

      // Notif console
      grunt.log.ok('Ready to process checker ...');

      // Run tasks
      grunt.task.run('yoctohint:hintchecker');
    }
  });

  // Node version is lower than last node LTS version ?
  if (semver.lt(process.version, '6.10.3')) {
    // Logging message
    grunt.log.ok([ 'Changing cwd directory to load modules because version of node is',
      process.version ].join(' '));

    // Change path to yocto-hint modules
    process.chdir(path.normalize([ __dirname, '..' ].join('/')));
  }

  // Load grunt needed task
  grunt.loadNpmTasks('grunt-nsp');
  grunt.loadNpmTasks('grunt-pagespeed');
  grunt.loadNpmTasks('grunt-eslint');

  // Go to the initial path
  process.chdir(cwd);
};
