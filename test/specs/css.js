define(function (require) {
  'use strict';

  describe('css', function () {
    var elem;

    beforeEach(function () {
      elem = jasmineDom.createElement('div')
        .withId('css-spec')
        .andAppendTo('body');
    });

    afterEach(function () {
      jasmineDom.destroy();
    });

    describe('requiring a style without extension', function () {
      require('css!test/specs/css');

      it('inserts the right style tag', function () {
        var style = window.getComputedStyle(elem);
        var color = style.color.replace(/\s+/g, '');
        expect(color).toBe('rgb(255,0,0)');
      });
    });

    describe('requiring a style with extension', function () {
      require('css!test/specs/css.style');

      it('inserts the right style tag', function () {
        var style = window.getComputedStyle(elem);
        var color = style.backgroundColor.replace(/\s+/g, '');
        expect(color).toBe('rgb(255,0,0)');
      });
    });
  });
});
