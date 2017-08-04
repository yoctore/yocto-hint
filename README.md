[![NPM](https://nodei.co/npm/yocto-hint.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yocto-hint/)

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

## Usage for lint Node files

## Usage for lint Angular files

