module.exports = {
  spec: {
    options: {
      helpers: 'test/helpers/**/*.js',
      specs:   ['test/specs/**/*.js', '!test/specs/**/sass.js'],

      template: require('grunt-template-jasmine-requirejs'),

      templateOptions: {
        version: 'vendor/requirejs/require.js',
        requireConfigFile: 'test/config.js'
      }
    }
  }
};
