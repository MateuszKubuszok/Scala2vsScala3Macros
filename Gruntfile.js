/* global module:false */
module.exports = function(grunt) {
  var port = grunt.option('port') || 8000;
  var root = grunt.option('root') || '.';

  if (!Array.isArray(root)) root = [root];

  const sass = require('sass');

  grunt.loadNpmTasks('grunt-run');

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner:
        '/*!\n' +
        ' * Presentation <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
        ' * https://kubuszok.com\n' +
        ' * MIT licensed\n' +
        ' *\n' +
        ' * Copyright (C) 2023 Mateusz Kubuszok, https://kubuszok.com\n' +
        ' */'
    },
    
    run: {
        prebuild: {
            cmd: 'yarn',
            args: ['run', 'prebuild']
        }
    },

    sass: {
      core: {
        options: {
          implementation: sass,
          sourceMap: true
        },
        files: {
          'reveal.js/dist/layout.css': 'css/layout.scss',
          'reveal.js/dist/reveal.css': 'css/reveal.scss',
          'reveal.js/dist/print/paper.css': 'css/print/paper.scss',
          'reveal.js/dist/print/pdf.css': 'css/print/pdf.scss',
        }
      },
      themes: {
        options: {
          implementation: sass,
          sourceMap: true
        },
        files: {
          'reveal.js/dist/theme/black.css': 'css/theme/source/black.scss'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: port,
          base: root,
          livereload: true,
          open: true,
          useAvailablePort: true
        }
      }
    },

    watch: {
      asciidoc: {
        files: [ 'index.adoc' ],
        tasks: 'prebuild'
      },
      css: {
        files: [ 'css/layout.scss','css/reveal.scss' ],
        tasks: 'css-core'
      },
      theme: {
        files: [
          'css/theme/source/*.sass',
          'css/theme/source/*.scss',
          'css/theme/template/*.sass',
          'css/theme/template/*.scss'
        ],
        tasks: 'css-themes'
      },
      html: {
        files: root.map(path => path + '/*.html')
      },
      markdown: {
        files: root.map(path => path + '/*.md')
      },
      options: {
        livereload: true
      }
    }

  });

  // Dependencies
  grunt.loadNpmTasks( 'grunt-contrib-connect' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-sass' );
  
  // Default task
  grunt.registerTask( 'default', [ 'css' ] );

  // Theme CSS
  grunt.registerTask( 'css-themes', [ 'sass:themes' ] );

  // Core framework CSS
  grunt.registerTask( 'css-core', [ 'sass:core' ] );

  // All CSS
  grunt.registerTask( 'css', [ 'sass' ] );

  // Package presentation to archive
  grunt.registerTask( 'package', [ 'default', 'zip' ] );

  // Serve presentation locally
  grunt.registerTask( 'serve', [ 'connect', 'watch' ] );
  
  // Rebuild ASCIIDocs
  grunt.registerTask( 'prebuild', [ 'run:prebuild' ]);

};
