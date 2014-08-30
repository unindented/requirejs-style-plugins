define(function (require) {
  'use strict';

  var util = require('./util');

  var defaults = {
    extension: 'scss'
  };

  function loadStyle(name, content, options, req, callback) {
    require(['./lib/sass'], function (Sass) {
      Sass.options(options);

      var css = Sass.compile(content);
      if (css.message) {
        return callback(css.message);
      }

      callback(null, css);
    });
  }

  function loadStyleBuild(name, content, options, req, callback) {
    var Sass = requirejs.nodeRequire('node-sass');

    try {
      util.extend(options, {data: content});
      callback(null, Sass.renderSync(options));
    }
    catch (err) {
      callback(err);
    }
  }

  return {
    load:       util.loadGenerator('sass', defaults, loadStyle, loadStyleBuild),
    write:      util.writeGenerator('sass'),
    onLayerEnd: util.layerGenerator('sass')
  };
});
