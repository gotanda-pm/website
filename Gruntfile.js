module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: ["htdocs/css/"],
    shell: {
      riji: {
        command: './riji.sh publish'
      }
    },
    compass: {
      production: {
        options: {
          config:      "compass.rb",
          environment: 'production'
        }
      },
      development: {
        options: {
          config:      "compass.rb",
          environment: "development"
        }
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      js: {
        files: {
          "htdocs/js/app.js": [
            "src/js/app.js"
          ]
        }
      }
    },
    connect: {
      app: {
        options: {
          livereload: true,
          base: ['htdocs'],
          port: 5000
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      riji: {
        files: ['src/riji/article/**/*.md', 'src/riji/share/tmpl/**/*.tx'],
        tasks: ['shell:riji']
      },
      scss: {
        files: ['src/scss/**/*.scss'],
        tasks: ['compass:development']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['uglify:js']
      }
    }
  });

  grunt.registerTask("html",    ["shell:riji"]);
  grunt.registerTask("css",     ["compass:production"]);
  grunt.registerTask("js",      ["uglify:js"]);
  grunt.registerTask("build",   ["html", "css", "js"]);

  grunt.registerTask("server",  ["connect:app", "watch"]);
  grunt.registerTask("default", ["server"]);

  grunt.task.run('notify_hooks');
};
