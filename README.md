# yocto-hint

> Manage & Valid Code style and usage of javascript on yocto.re 
> Code is validate with JShint & JSCS

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
