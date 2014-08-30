define(function (require) {
  'use strict';

  var text = require('./lib/text');

  // Generators

  var _config = null;
  var _buildCache = {};
  var _buildLayers = [];

  function cacheStyle() {
  }

  function cacheStyleBuild(name, css) {
    if (typeof css === 'undefined') {
      return _buildCache[name];
    }
    _buildCache[name] = css;
  }

  function layerStyleBuild(css) {
    if (typeof css === 'undefined') {
      return _buildLayers.join('');
    }
    _buildLayers.push(css);
  }

  function procStyle(css, callback) {
    injectStyle(css);
    setTimeout(callback, 7);
  }

  function procStyleBuild(css, callback) {
    callback(css);
  }

  function optimizeStyle(css, optimizer) {
    if (optimizer === 'cleancss') {
      var Clean = requirejs.nodeRequire('clean-css');
      return new Clean().minify(css);
    }
    else if (optimizer === 'csso') {
      var Csso = requirejs.nodeRequire('csso');
      return Csso.justDoIt(css);
    }
    else {
      throw new Error('optimizer with name of "' + optimizer + '" not found for this environment');
    }
  }

  function writeStyleBuild(plugin, module) {
    return 'define("' + plugin + '!' + module + '", function () {' +
      '});\n';
  }

  function writeInlineLayer(name, css) {
    return '(function (c) {' +
        'var d = window.document,' +
            'h = d.head || d.getElementsByTagName("head")[0],' +
            's = d.createElement("style");' +
        'h.appendChild(s);' +
        'if (s.styleSheet) {' +
          's.styleSheet.cssText += c;' +
        '}' +
        'else {' +
          's.appendChild(d.createTextNode(c));' +
        '}' +
      '})("' + escapeStyle(css) + '");\n';
  }

  function writeFileLayer(name, css) {
    var fs   = requirejs.nodeRequire('fs');
    var path = requirejs.nodeRequire('path');

    var file = _config.dir ?
      path.resolve(_config.dir, _config.baseUrl, name + '.css') :
      _config.out.replace(/(\.js)?$/, '.css');

    fs.writeFileSync(file, css, 'utf8');
  }

  function loadGenerator(key, defaults, loadStyle, loadStyleBuild) {
    return function (name, req, callback, config) {
      _config = config;

      var isBuild = config.isBuild;

      var keyConfig = extend({}, defaults, config[key]);
      var options   = extend({}, keyConfig.options);
      var extension = '.' + keyConfig.extension;

      var file = name;
      if (extension != null && !hasExtension(file)) {
        file += extension;
      }

      text.load(file, req, function (content) {
        var loadFunc  = (!isBuild ? loadStyle  : loadStyleBuild);
        var cacheFunc = (!isBuild ? cacheStyle : cacheStyleBuild);
        var procFunc  = (!isBuild ? procStyle  : procStyleBuild);

        loadFunc(name, content, options, req, function (err, css) {
          if (err) {
            return callback.error(err);
          }

          cacheFunc(name, css);
          procFunc(css, callback);
        });
      });
    };
  }

  function writeGenerator() {
    return function (plugin, module, output) {
      var css = cacheStyleBuild(module);
      if (!css) {
        return;
      }

      layerStyleBuild(css);
      output(writeStyleBuild(plugin, module, css));
    };
  }

  function layerGenerator() {
    return function (output, data) {
      var css = layerStyleBuild();
      if (!css) {
        return;
      }

      if (_config.optimizeCss) {
        css = optimizeStyle(css, _config.optimizeCss);
      }

      if (_config.separateCss) {
        writeFileLayer(data.name, css);
      }
      else {
        output(writeInlineLayer(data.name, css));
      }
    };
  }

  // Style helpers

  var _head = null;
  var _style = null;
  var _styleCount = 0;

  function injectStyle(css) {
    _head = _head ||
      window.document.head ||
      window.document.getElementsByTagName('head')[0];

    if (_styleCount < 31) {
      _style = window.document.createElement('style');
      _head.appendChild(_style);
      _styleCount++;
    }
    if (_style.styleSheet) {
      _style.styleSheet.cssText += css;
    }
    else {
      _style.appendChild(window.document.createTextNode(css));
    }
  }

  function escapeStyle(css) {
    return css
      .replace(/(")/g,  '\\"')
      .replace(/[\b]/g, '\\b')
      .replace(/[\f]/g, '\\f')
      .replace(/[\n]/g, '\\n')
      .replace(/[\r]/g, '\\r')
      .replace(/[\t]/g, '\\t');
  }

  // Utility helpers

  function bind(fn, context) {
    return function () {
      return fn.apply(context, arguments);
    };
  }

  function extend(target) {
    var source, prop, args, i, l;

    args = Array.prototype.slice.call(arguments, 1);
    for (i = 0, l = args.length; i < l; i++) {
      source = args[i];
      if (source) {
        for (prop in source) {
          target[prop] = source[prop];
        }
      }
    }

    return target;
  }

  function hasExtension(file) {
    return (/\.[^.\/]+$/).test(file);
  }

  return {
    bind:           bind,
    extend:         extend,
    loadGenerator:  loadGenerator,
    writeGenerator: writeGenerator,
    layerGenerator: layerGenerator
  };
});
