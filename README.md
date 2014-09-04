# RequireJS Style Plugins [![Build Status](https://secure.travis-ci.org/unindented/requirejs-style-plugins.png)](http://travis-ci.org/unindented/requirejs-style-plugins) [![Dependency Status](https://gemnasium.com/unindented/requirejs-style-plugins.png)](https://gemnasium.com/unindented/requirejs-style-plugins)

Small set of plugins for [RequireJS](http://requirejs.org/) that deal with CSS and preprocessors such as [Less](http://lesscss.org/) or [Sass](http://sass-lang.com/).

For more plugins please check the [RequireJS wiki](https://github.com/jrburke/requirejs/wiki/Plugins).


## Installing

You can use [bower](http://bower.io/) to install this set of plugins:

```sh
$ bower install --save requirejs-style-plugins
```


## Loading a CSS stylesheet

To use CSS stylesheets in your app, your configuration should look like this:

```js
require.config({
  map: {
    '*': {
      css: 'bower_components/requirejs-style-plugins/css'
    }
  }
});
```

Then you would load the stylesheet in your view like this:

```js
define(function (require) {
  require('css!views/button');

  var Backbone = require('backbone');

  return Backbone.View.extend({
    tagName: 'button'
  });
});
```

Which would try to load `views/button.css`:

```css
button {
  color: red;
}
```


## Loading a Less stylesheet

To use [Less](http://lesscss.org/) stylesheets, your configuration should look like this:

```js
require.config({
  map: {
    '*': {
      less: 'bower_components/requirejs-style-plugins/less'
    }
  }
});
```

Then you would load the stylesheet in your view like this:

```js
define(function (require) {
  require('less!views/button');

  var Backbone = require('backbone');

  return Backbone.View.extend({
    tagName: 'button'
  });
});
```

Which would try to load `views/button.less`:

```less
@color: green;

button {
  color: @color;
}
```


## Loading a Sass stylesheet

To use [Sass](http://sass-lang.com/) stylesheets, your configuration should look like this:

```js
require.config({
  map: {
    '*': {
      sass: 'bower_components/requirejs-style-plugins/sass'
    }
  }
});
```

Then you would load the stylesheet in your view like this:

```js
define(function (require) {
  require('sass!views/button');

  var Backbone = require('backbone');

  return Backbone.View.extend({
    tagName: 'button'
  });
});
```

Which would try to load `views/button.sass`:

```sass
$color: blue;

button {
  color: $color;
}
```


## Testing

### Browser

Run the following:

```sh
$ grunt test:browser
```

And open <http://localhost:8000/> in your browser.

If you want to rerun tests on file changes, run the following instead:

```sh
$ grunt follow:browser
```

### PhantomJS

Run the following:

```sh
$ grunt test:phantom
```

If you want to rerun tests on file changes, run the following instead:

```sh
$ grunt follow:phantom
```


## Meta

* Code: `git clone git://github.com/unindented/requirejs-style-plugins.git`
* Home: <https://github.com/unindented/requirejs-style-plugins/>


## Contributors

Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))


## License

Copyright (c) 2014 Daniel Perez Alvarez ([unindented.org](https://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
