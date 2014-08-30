define(function (require) {
  'use strict';

  describe('less', function () {
    var elem;

    beforeEach(function () {
      elem = jasmineDom.createElement('div')
        .withId('less-spec')
        .andAppendTo('body');
    });

    afterEach(function () {
      jasmineDom.destroy();
    });

    describe('requiring a style without extension', function () {
      require('less!test/specs/less');

      it('inserts the right style tag', function () {
        var style = window.getComputedStyle(elem);
        var color = style.color.replace(/\s+/g, '');
        expect(color).toBe('rgb(0,128,0)');
      });
    });

    describe('requiring a style with extension', function () {
      require('less!test/specs/less.style');

      it('inserts the right style tag', function () {
        var style = window.getComputedStyle(elem);
        var color = style.backgroundColor.replace(/\s+/g, '');
        expect(color).toBe('rgb(0,128,0)');
      });
    });
  });
});
