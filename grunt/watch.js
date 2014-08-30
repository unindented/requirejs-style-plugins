module.exports = {
  grunt: {
    files: ['Gruntfile.js', 'grunt/**/*'],
    tasks: ['lint']
  },

  phantom: {
    files: ['src/**/*', 'test/**/*'],
    tasks: ['lint', 'test:phantom']
  },

  browser: {
    files: ['src/**/*', 'test/**/*'],
    tasks: ['lint'],

    options: {
      livereload: true
    }
  }
};
