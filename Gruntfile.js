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
      task0: {
        src: 'app/index.html',
        dest: 'dist/index.html'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'app/scripts/**/*.js', 'test/**/*.js','!app/js/md5.js'],


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

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['jshint', 'htmlhint','csslint']);
  grunt.registerTask('build', ['copy:task0', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'usemin']);
  grunt.registerTask('default', ['test', 'build']);

  grunt.registerMultiTask('log', 'Log stuff.', function() {
    grunt.log.writeln(this.target + ': ' + this.data);
  }); 
 

};
