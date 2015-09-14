# yocto-hint

> Manage & Valid Code style and usage of javascript
> Code is validate with JShint & JSCS

## Motivation

Code style and good programming rules are very important to create a solid and comprehensive program.

All the time we need to install jshint and jscs separately and we must configure each tools
for a complete validation.

That why we created this tools, to have a unique tools for a complete programming validation.

## How to use

> In your project install our plugin

- If you install from npm registry : 

```shell
npm install yocto-hint --save-dev
```

 - Or add this line on your package.json : 

```shell
{
    "yocto-hint" : "latest"
}
```
### Configuration & Options
In your project's Gruntfile, add a section named `yoctohint` to the data object passed into `grunt.initConfig()`.

```js
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
```
