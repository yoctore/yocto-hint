'use strict';

var _         = require('lodash');
var hooker    = require('hooker');
var chalk     = require('chalk');
var path      = require('path');
var semver    = require('semver');
var timegrunt = require('time-grunt');
var treeify   = require('treeify');
var eslint    = require('eslint');
var inquirer  = require('inquirer');
var os        = require('os');
var money     = require('money-math');

/**
 * Default export for grunt yocto-norme-plugin
 *
 * @param {string} grunt default grunt instance to use on current module
 */
module.exports = function (grunt) {
  // Require external module time grunt to get metrics on execution task
  timegrunt(grunt);

  // Flag to define is force fix was set
  var forceFix = false;

  // Define Global Grade
  var globalGrade = 20.00;

  // Save current path
  var cwd = process.cwd();

  // Default yocto config for jshint and jscs code style
  var defaultOptions = {
    eslint : {
      options : {
        cache       : false,
        configFile  : '',
        fix         : false,
        format      : 'stylish',
        maxWarnings : 0,
        quiet       : false,
        rules       : {}
      },
      target : []
    }
  };

  // Define hooker for the last step of hinter
  hooker.hook(grunt.log.writeln(), [ 'success', 'fail' ], function (res) {
    // Check done or aborted
    var done    = res === 'Done, without errors.' || 'Done.';
    var warning = res === 'Done, but with warnings.';
    var aborted = res === 'Aborted due to warnings.';
    var error   = warning || aborted;
    var state   = error ? 'error' : 'success';
    var arts;
    var artPath;
    var sMsg;

    // Default message config
    var cMsg = {
      level : error ? 'warn' : 'ok',
      msg   : error ? 'Please correct your code !!! ' : 'Good Job. Padawan !!'
    };

    // Is finish ??
    if (done || error) {
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

        // Print grade
        console.log(chalk[sMsg.color]([ 'Your grade is : ', globalGrade, '/20' ].join('')));
      } catch (e) {
        // Log exeption, but it produces by art config
        grunt.log.warn([ 'Plugin error.', e ].join(' '));

        // Need to log end message with custom param
        grunt.log[cMsg.level](cMsg.msg);
      }
    }
  });

  // Create my main task to process all check we need
  grunt.registerTask('yoctohint:lintchecker', 'Main lint process', function (target) {
    // Get configuration for current linter
    var configuration = grunt.option('eslint');

    // Get options
    var options       = configuration.options;

    // Get correct formatter
    var formatter = eslint.CLIEngine.getFormatter(options.format);

    // Formatter is defined ?
    if (!formatter) {
      // A warning message
      grunt.log.warn([ 'Could not find formatter', options.format ].join(' '));

      // If invalid we return an invalid statement
      return false;
    }

    // We prepare notation item
    var notation = _.map(configuration.target, function (file) {
      // Default statement
      return {
        file  : file,
        grade : 20 / _.size(configuration.target)
      }
    });

    // Try to get eslint engine
    var engine = new eslint.CLIEngine(options);

    // Default report value 
    var report = {};

    // Do the main process on try/catch
    try {
      // Process on define files
      report = engine.executeOnFiles(configuration.target);
    } catch (err) {
      // In this case log the error
      grunt.log.warn(err);

      // And return an invalid statement
      return false;
    }

    // Fix option is defined ?
    if (options.fix) {
      // Process fix
      eslint.CLIEngine.outputFixes(report);
    }

    // Get result
    var results = report.results;
    var treeObj = {};

    // Build a tree result to process the properly print and build notation in the same case
    notation = _.compact(_.flattenDeep(_.map(results, function (result) {
      // Define default object to build.
      // We do not use _.set of lodash because property key have . in name
      // set Value properly
      treeObj[result.filePath] = (function () {
        // Has error ?
        if (result.errorCount || result.fixableErrorCount) {
          // Error statement
          return chalk.red('✖');
        }

        // Has warning ?
        if (result.warningCount || result.fixableWarningCount) {
          // Warning statement
          return chalk.yellow('⚠');
        }

        // Default statement
        return chalk.green('✓');
      }());

      // Process notation part
      return _.map(notation, function (note) {
        // Is correct file do the notation process
        if (_.includes(result.filePath, note.file)) {
          // Define default delta notation
          var errorDelta = 2 / _.size(configuration.target);
          var warningDelta = 1 / _.size(configuration.target);

          // Update grade value
          note.grade = (result.fixableErrorCount + result.errorCount) * errorDelta;
          note.grade += (result.fixableWarningCount + result.warningCount) * warningDelta;

          // Default statement
          return note;
        }

        // Default statement
        return false;
      });
    })));

    // Quiet option is defined ?
    if (options.quiet) {
      // Store result
      results = eslint.CLIEngine.getErrorResults(results);
    }

    // Get output result from formatter
    console.log(formatter(results));

    // Normalize notation array
    _.each(notation, function (note) {
      // Build global rate
      globalGrade = money.subtract(money.floatToAmount(globalGrade),
        money.floatToAmount(note.grade));
    })

    // Has too many warning
    var tooManyWarnings = options.maxWarnings >= 0 && report.warningCount > options.maxWarnings;

    // Has too many warnings
    if (report.errorCount === 0 && tooManyWarnings) {
      grunt.log.warn([
        'ESLint found too many warnings (maximum allowed: ', options.maxWarnings, ')'
      ].join(''));
    }

    // All is ok ?
    if (report.errorCount === 0 && !tooManyWarnings) {
      // Log an ok message
      grunt.log.ok([ 'All seems to be ok for', target ].join(' '));
    }

    // Show global result as a tree
    console.log(treeify.asTree(treeObj, true));

    // Default statement for the eslint process
    return report.errorCount === 0 && !tooManyWarnings;
  });


  // Register default plugin process
  grunt.registerMultiTask('yoctohint', 'Manage and process code usage on yocto.', function () {
    // Create an async process
    var done = this.async();

    /**
     * Main function to hint given file
     *
     * @return {Boolean} true in case of success, false otherwise
     */
    function hint () {
      // Retrieve current options
      var options = this.options();

      // Normalize data
      options.env = options.env || {};

      // Forcefix is defined ?
      if (forceFix === true) {
        // Change the value
        defaultOptions.eslint.options.fix = forceFix;

        // Log message for fix enabled
        grunt.log.ok('Fix option is enabled. We use it.');
      }

      // ES6 is enabled ?
      if (this.target === 'node') {
        // Suffix target with correct ES value
        this.target = _.compact([
          this.target,
          options.env.es6 ? 'es6' : 'es5',
          options.compatibility && !options.env.es6 ? 'compatibility' : false
        ]).join('-');
      }

      // Filter file and return correct file path
      this.data = _.flattenDeep(this.filesSrc.map(function (filepath) {
        // Return file path
        return filepath;
      }));

      // Has data ?
      if (!_.isEmpty(this.data)) {
        // Log message we have data
        grunt.log.subhead([
          this.data.length, [ 'file', this.data.length > 1 ? 's' : '' ].join(''),
          ' was founded. We add them on hinter list.'
        ].join(' '));

        // Log tree of file
        console.log(treeify.asTree(_.zipObject(this.data, _.map(this.data, function () {
          // Default statement
          return null;
        })), true));

        // Assign default options to config file
        defaultOptions.eslint.target = this.data;

        // Set properly the rule config
        defaultOptions.eslint.options.configFile = [
          __dirname, 'rules', [ 'yocto', this.target, 'eslintrc.yaml' ].join('-')
        ].join('/');

        // Config file exists
        if (!grunt.file.exists(defaultOptions.eslint.options.configFile)) {
          // Warning message because config for current key is not defined
          return grunt.log.warn([
            'Cannot process hint for', this.target, 'beacause eslint config file is node defined'
          ].join(' '));
        }

        // Merge config data to grunt config
        grunt.config.merge('eslint', _.omit(defaultOptions.eslint, 'options.configFile'));

        // Notif console
        grunt.log.ok([ 'Ready to process eslint checker for', this.target ].join(' '));

        // Set option for next process
        grunt.option('eslint', defaultOptions.eslint);

        // Run main task
        return grunt.task.run([ 'yoctohint:lintchecker', this.target ].join(':'));
      }

      // Skipped in case of no file was founded
      grunt.log.ok('No files was defined/founded. Skipping this process ...');

      // Default statement
      return true;
    }

    // Fix options if required
    if (grunt.cli.options.fix && !forceFix) {
      // Write important subhead message
      grunt.log.subhead([
        'The --fix option was requested from cli command.',
        'This option will automatically fix rules defined on your config rules',
        'This option use the fix method of eslint : http://eslint.org/docs/rules',
        'This will replace matching content on your source file'
      ].join(os.EOL));

      // Prompt message to ask confirmation
      inquirer.prompt({
        message : [
          'Are you sure to want to fix automatically ?',
          '(We will force fix for all next tasks)'
        ].join(' '),
        name : 'fix',
        type : 'confirm'
      }).then(function (fix) {
        // Change this value for the next process
        forceFix = fix.fix;

        // Call hint process with async callback
        if (hint.call(this)) {
          done()
        }
      }.bind(this))
    } else if (hint.call(this)) {
      // Call the end callback
      done();
    }
  });

  // Node version is lower than last node LTS version ?
  if (semver.lt(process.version, '6.0.0')) {
    // Logging message
    grunt.log.ok([ 'Changing cwd directory to load modules because version of node is',
      process.version ].join(' '));

    // Change path to yocto-hint modules
    process.chdir(path.normalize([ __dirname, '..' ].join('/')));
  }

  // Go to the initial path
  process.chdir(cwd);
};
