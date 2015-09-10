# yocto-hint

> Manage and process code style and usage on yocto. Code is validate with JShint & JSCS

## How to use

> In your project install our plugin

```shell
# If you install from npm registry
npm install yocto-hint --save-dev
```

```shell
# if you install it from private repository. Add this line on your package.json
{
    "yoctohint" : "git+ssh://git@gitlab.com:yocto-node-modules/yocto-hint.git"
}
```
### Overview & Options
In your project's Gruntfile, add a section named `yoctohint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  yoctohint : {
      options : {
        // If you wan to override jshint rules ...
        // prefer defined rules. But if by default you are in node mode.
        // If you want to hint in classic mode, set node property to null
        jshint : {}
      },
      // Set all your file here
      all : [ 'file.js', 'file2.js', 'file3.js' ]
    }
});

// load task
grunt.loadNpmTasks('yoctohint');

```
