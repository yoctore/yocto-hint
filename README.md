[![NPM](https://nodei.co/npm/yocto-hint.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yocto-hint/)

![alt text](https://cdn.gruntjs.com/builtwith.png)
![alt text](https://david-dm.org/yoctore/yocto-hint.svg "Dependencies Status")
[![Build Status](https://travis-ci.org/yoctore/yocto-hint.svg?branch=master)](https://travis-ci.org/yoctore/yocto-hint)

## Motivation

Code style and good programming rules are very important to create a solid and comprehensive program.

All the time we need to install many tools to hint our code source for a complete validation.

That why we created an unique and ready to use tool for a complete programming validation for source code based on javascript, node, angular .

## Breaking changes

In previous version we used Jshint and Jscs. Since few time Jscs and Eslint decided to work on the same tool, so we decided to forgot Jshint for Eslint.

This tools was completely rewrite, and has no compatibility with 1.x.x version.

## How to install ?

```shell
npm install yocto-hint --save-dev
```

## General usage

In your project's Gruntfile, add a section named `yoctohint` to the data object passed into `grunt.initConfig()`.

```javascript
'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // Default package
    pkg : grunt.file.readJSON('package.json'),

    // Configuration to be run (and then tested).
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

// and run grunt hint in your shell
```

## Usage for lint JSON files

For Json files you must specify the `json` key on your Gruntfile like below.

## Usage for lint Node files

For Node files you must specify the `node` key on your Gruntfile like below.

## Usage for lint Angular files

For Angular files you must specify the `angular` key on your Gruntfile like below.

## ES5 vs ES6

This tools is based on eslint so we support ES6 lint features. To enable the ES6 feature you must defined in `options` property the `env` key on your Gruntfile, for example : 

```
'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // Default package
    pkg : grunt.file.readJSON('package.json'),

    // Configuration to be run (and then tested).
    yoctohint : {
      json : [
        'package.json'
      ],
      node : [
        'Gruntfile.js',
        'tasks/yoctohint.js'
      ],
      options : {
        env : {
          es6 : true // this will be enable es6 for all your node files
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
```

# How to use --fix options of linter

Some errors can be automatically fix by the linter, go do this just go : 

```bash
grunt --fix
```

# Compatibility with older hint process

For some rules compatibility is required with our old hinter tool.
To use this compatibility and not check old rules with grunt like below : 

```
'use strict';

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    // Default package
    pkg : grunt.file.readJSON('package.json'),

    // Configuration to be run (and then tested).
    yoctohint : {
      json : [
        'package.json'
      ],
      node : [
        'Gruntfile.js',
        'tasks/yoctohint.js'
      ],
      options : {
        compatibility : true // to enable compatibility rules enabled
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Load npm task
  grunt.registerTask('test', [ 'yoctohint' ]);
  grunt.registerTask('default', [ 'test' ]);
};