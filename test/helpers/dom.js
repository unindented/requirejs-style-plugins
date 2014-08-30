(function (window, document) {
  'use strict';

  var element;
  var elements = [];

  var select = function (target) {
    if (typeof target === 'string') {
      if (target.charAt(0) === '#') {
        target = document.getElementById(target.substr(1));
      }
      else if (target.charAt(0) === '.') {
        target = document.getElementsByClassName(target.substr(1))[0];
      }
      else {
        target = document.getElementsByTagName(target)[0];
      }
    }
    return target;
  };

  window.jasmineDom = {
    createElement: function (tagName) {
      element = document.createElement(tagName);
      elements.push(element);
      return this;
    },

    withId: function (id) {
      element.id = id;
      return this;
    },

    withClasses: function (classes) {
      element.className = classes;
      return this;
    },

    withContent: function (content) {
      element.innerHTML = content;
      return this;
    },

    andAppendTo: function (target) {
      select(target).appendChild(element);
      return element;
    },

    destroy: function () {
      for (var i = 0, l = elements.length; i < l; i++) {
        document.body.removeChild(elements[i]);
        elements.pop(i);
      }
    }
  };

})(this, this.document);
