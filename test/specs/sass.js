define(function (require) {
  'use strict';

  describe('sass', function () {
    var elem;

    beforeEach(function () {
      elem = jasmineDom.createElement('div')
        .withId('sass-spec')
        .andAppendTo('body');
    });

    afterEach(function () {
      jasmineDom.destroy();
    });

    describe('requiring a style without extension', function () {
      require('sass!test/specs/sass');

      it('inserts the right style tag', function () {
        var style = window.getComputedStyle(elem);
        var color = style.color.replace(/\s+/g, '');
        expect(color).toBe('rgb(0,0,255)');
      });
    });

    describe('requiring a style with extension', function () {
      require('sass!test/specs/sass.style');

      it('inserts the right style tag', function () {
        var style = window.getComputedStyle(elem);
        var color = style.backgroundColor.replace(/\s+/g, '');
        expect(color).toBe('rgb(0,0,255)');
      });
    });
  });
});
