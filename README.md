[![NPM](https://nodei.co/npm/yocto-hint.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yocto-hint/)

![alt text](https://david-dm.org/yoctore/yocto-hint.svg "Dependencies Status")
[![Code Climate](https://codeclimate.com/github/yoctore/yocto-hint/badges/gpa.svg)](https://codeclimate.com/github/yoctore/yocto-hint)
[![Test Coverage](https://codeclimate.com/github/yoctore/yocto-hint/badges/coverage.svg)](https://codeclimate.com/github/yoctore/yocto-hint/coverage)
[![Issue Count](https://codeclimate.com/github/yoctore/yocto-hint/badges/issue_count.svg)](https://codeclimate.com/github/yoctore/yocto-hint)
[![Build Status](https://travis-ci.org/yoctore/yocto-orika.svg?branch=master)](https://travis-ci.org/yoctore/yocto-orika)


## Motivation

Code style and good programming rules are very important to create a solid and comprehensive program.

All the time we need to install jshint and jscs separately and we must configure each tools
for a complete validation.

That why we created this tools, to have a unique and ready to use tools for a complete programming validation.

***NEW : Check your node vulnerability with : [grunt-nsp](https://www.npmjs.com/package/grunt-nsp)***

## Installation

```shell
npm install yocto-hint --save-dev
```

## Usage & options
In your project's Gruntfile, add a section named `yoctohint` to the data object passed into `grunt.initConfig()`.

```javascript
grunt.initConfig({
  yoctohint : {
      options : {
        // It's possible to override jshint rules ...
        // but prefer defined rules. By default you are in node mode.
        // If you want to hint in classic mode, set node property to null
        jshint : {
          node : null // for classic mode
        }
      },
      // Set all your file here
      all : [ 'file.js', 'file2.js', 'file3.js' ]
    }
});
// load task
grunt.loadNpmTasks('yocto-hint');

// register task
grunt.registerTask('hint', [ 'yoctohint' ]);

// and run grunt hint in your shell
```

## Defined configuration

We used JSHint (http://jshint.com/) with rules below :

```javascript
jshint  : {
    options : {
        curly     : true,
        node      : true,
        yui       : true,
        eqeqeq    : true,
        unused    : true,
        undef     : true,
        freeze    : true
    },
}
```

We used JSCS (http://jscs.info) with rules below. 
For each rule details please read jscs documentation at  : http://jscs.info/rules

```javascript
{
    "requireCurlyBraces": [
        "if",
        "else",
        "for",
        "while",
        "do",
        "try",
        "catch"
    ],
    "requireOperatorBeforeLineBreak": true,
    "requireCamelCaseOrUpperCaseIdentifiers": true,
    "maximumLineLength": {
      "value" : 100,
      "allExcept": ["comments", "regex"]
    },
    "validateIndentation": 2,
    "validateQuoteMarks": "'",
    "disallowMultipleLineStrings": true,
    "disallowMixedSpacesAndTabs": true,
    "disallowTrailingWhitespace": true,
    "disallowSpaceAfterPrefixUnaryOperators": true,
    "disallowMultipleVarDecl": true,
    "disallowKeywordsOnNewLine": ["else"],
    "requireSpaceAfterKeywords": true,
    "requireSpaceBeforeBinaryOperators": [
        "=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=",
        "&=", "|=", "^=", "+=",
        "+", "-", "*", "/", "%", "<<", ">>", ">>>", "&",
        "|", "^", "&&", "||", "===", "==", ">=",
        "<=", "<", ">", "!=", "!=="
    ],
    "requireSpaceAfterBinaryOperators": true,
    "requireSpacesInConditionalExpression": true,
    "requireSpaceBeforeBlockStatements": true,
    "requireSpacesInForStatement": true,
    "requireLineFeedAtFileEnd": true,
    "requireSpacesInAnonymousFunctionExpression" : {
      "beforeOpeningRoundBrace" : true,
      "beforeOpeningCurlyBrace" : true
    },
    "requireSpacesInFunctionDeclaration" : {
        "beforeOpeningRoundBrace" : true,
        "beforeOpeningCurlyBrace" : true
    },
    "requireSpacesInNamedFunctionExpression" : {
        "beforeOpeningRoundBrace" : true,
        "beforeOpeningCurlyBrace" : true
    },
    "requireSpacesInFunctionExpression": {
        "beforeOpeningCurlyBrace" : true,
        "beforeOpeningRoundBrace" : true
    },
    "requireSpacesInsideObjectBrackets" : "all",
    "disallowSpacesInsideParentheses": true,
    "disallowMultipleLineBreaks": true,
    "disallowNewlineBeforeBlockStatements": true,
    "disallowKeywords": [ "with" ],
    "disallowSpacesInCallExpression": true,
    "requireSpaceAfterObjectKeys" : true,
    "requireSpaceBeforeObjectValues": true,
    "requireCapitalizedConstructors": true,
    "requireDotNotation": true,
    "requireSemicolons": true,
    "validateParameterSeparator": ", ",
    "jsDoc": {
        "checkAnnotations" : {
          "preset" : "jsdoc3",
          "extra"  : {
            "date" : true,
            "method" : true,
            "copyright" : true
          }
        },
        "checkParamNames": true,
        "requireParamTypes": true,
        "checkRedundantParams": true,
        "checkReturnTypes": true,
        "checkRedundantReturns": true,
        "requireReturnTypes": true,
        "checkTypes": "capitalizedNativeCase",
        "checkRedundantAccess" : true,
        "requireNewlineAfterDescription" : true,
        "checkTypes" : true,
        "requireParamDescription" : true        
    },
    "requireSpaceAfterLineComment" : true,
    "requireAlignedObjectValues": "all",
    "validateLineBreaks" : "LF",
    "requirePaddingNewLinesAfterUseStrict" : true
}
```
