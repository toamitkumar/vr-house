module.exports = function(grunt) {


  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/index.html']
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app',
          dest: 'dist',
          src: ['*.html', '*.json'] 
        }, 
        {
          expand: true,
          cwd: 'images',
          dest: 'dist/images',
          src: ['*.{jpg,jpeg,png}']
        }]
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'app/scripts/**/*.js', 'test/**/*.js', '!app/scripts/ext/*.js'],


      options: {
        jshintrc: '.jshintrc'
      }
    },
    htmlhint: {
      src: ['app/index.html']
    },
    csslint: {
      src: ['app/styles/*.css']
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'app'
        }
      }
    },

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['jshint', 'htmlhint', 'csslint']);
  grunt.registerTask('build', ['copy:dist', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'usemin']);
  grunt.registerTask('default', ['test', 'build']);

  grunt.registerMultiTask('log', 'Log stuff.', function() {
    grunt.log.writeln(this.target + ': ' + this.data);
  });


};
