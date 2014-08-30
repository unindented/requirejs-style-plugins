define(function (require) {
  'use strict';

  var util = require('./util');

  var defaults = {
    extension: 'css'
  };

  function loadStyle(name, content, options, req, callback) {
    callback(null, content);
  }

  return {
    load:       util.loadGenerator('css', defaults, loadStyle, loadStyle),
    write:      util.writeGenerator('css'),
    onLayerEnd: util.layerGenerator('css')
  };
});
