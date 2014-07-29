module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    stylus:
      compile:
        files:
          'css/style.css': 'stylus/style.styl'

    clean: ['js/*.js', 'css/*.css', 'build']

    watch:
      scripts:
        files: ['stylus/*.styl', 'coffee/*.coffee', 'templates/*.html']
        tasks: ['default']

    connect:
      server:
        options:
          keepalive: true
          port: 1234

    require('load-grunt-tasks')(grunt)

  grunt.registerTask 'default', ['stylus', 'browserify']
