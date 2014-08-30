define(function (require) {
  'use strict';

  var util = require('./util');

  var defaults = {
    extension: 'less'
  };

  function parse(Less, content, options, callback) {
    var parser = new Less.Parser(options);

    parser.parse(content, function (err, tree) {
      if (err) {
        return callback(err);
      }

      try {
        callback(null, tree.toCSS());
      }
      catch (errr) {
        callback(errr);
      }
    });
  }

  function loadStyle(name, content, options, req, callback) {
    require(['./lib/less'], function (Less) {
      parse(Less, content, options, callback);
    });
  }

  function loadStyleBuild(name, content, options, req, callback) {
    var Less = requirejs.nodeRequire('less');
    parse(Less, content, options, callback);
  }

  return {
    load:       util.loadGenerator('less', defaults, loadStyle, loadStyleBuild),
    write:      util.writeGenerator('less'),
    onLayerEnd: util.layerGenerator('less')
  };
});
