module.exports = {
  'lint':           ['jshint'],

  'test:phantom':   ['jasmine:spec'],
  'test:browser':   ['jasmine:spec:build', 'connect:spec:keepalive'],

  'follow:phantom': ['jasmine:spec', 'watch:phantom'],
  'follow:browser': ['jasmine:spec:build', 'connect:spec', 'watch:browser'],

  'default':        ['lint', 'test:phantom']
};
