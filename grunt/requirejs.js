module.exports = {
  compile: {
    options: {
      baseUrl: '.',
      include: ['spec/main.js'],
      insertRequire: ['spec/main.js'],

      name: 'main',
      mainConfigFile: 'spec/main.js',

      out: 'spec/dist.js',
      optimize: 'none'
    }
  }
};
