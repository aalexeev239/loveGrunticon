module.exports = function(grunt) {


  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  require('time-grunt')(grunt);


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    config: {
      src: 'src',
      dist: 'distassets',
      grunticonSelectors: (function() {
        var path = 'src/_svg/_customSelectors.json';
        return grunt.file.exists(path) ? grunt.file.readJSON(path) : {}
      }())
    },

    // ===========
    // SVG TASK
    // ===========

    svgmin: {
      options: {
        plugins: [
          {
            removeDesc: true
          }
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/_svg',
          src: ['!!ai','*.svg'],
          dest: '<%= config.src %>/_svg/_svgmin'
        }]
      }
    },


    grunticon: {
      mysvg: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/_svg',
          src: ['_svgmin/*.svg', '*.png'],
          dest: '<%= config.src %>'
        }],
        options: {
          datasvgcss   : 'css/grunticon-icons.data.svg.css',
          datapngcss   : 'css/grunticon-icons.data.png.css',
          urlpngcss    : 'css/grunticon-icons.fallback.css',
          previewhtml  : '_grunticon-preview.html',
          pngfolder    : 'img/svg/png-grunticon',
          loadersnippet: 'js/lib/grunticon.loader.js',
          pngpath      : '../img/svg/png-grunticon',
          template     : '<%= config.src %>/_svg/_template.hbs',
          defaultWidth : '20px',
          defaultHeight: '20px',
          customselectors: '<%= config.grunticonSelectors %>',
          enhanceSVG: true
        }
      }
    },



    // END SVG TASK

    clean: {
      svg: [
        '<%= config.src %>/_svg/_svgmin',
        '<%= config.src %>/img/svg/png-grunticon',
        '<%= config.src %>/css/grunticon*'
      ]
    }




  });



  grunt.registerTask('svg', [
    'clean:svg',
    'svgmin',
    'grunticon'
  ]);
};
