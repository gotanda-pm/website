var gruntConnectProxyUtils = require('grunt-connect-proxy/lib/utils');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.registerTask("deploy", "Deploy to github pages.", function () {
    var done = this.async();
    grunt.util.spawn({
      cmd:  "git",
      args: ["--no-pager", "log", "-n", "1", "--format=publish at commit %h", "HEAD", "htdocs"]
    }, function (error, result, code) {
      if (code === 0) {
        grunt.util.spawn({
          cmd:  "../tools/git-pushdir/git-pushdir",
          args: ["-m", result.stdout, "git@github.com:gotanda-pm/gotanda-pm.github.io.git"],
          opts: { cwd: "htdocs" }
        }, done);
      }
      else {
        grunt.log.errorlns(error);
        done();
      }
    });
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: ["htdocs/css/", "htdocs/js/"],
    shell: {
      riji: {
        command: './riji.sh server'
      },
      publish: {
        command: './riji.sh publish'
      }
    },
    compass: {
      production: {
        options: {
          bundleExec: true,
          config:      "compass.rb",
          environment: 'production'
        }
      },
      development: {
        options: {
          bundleExec: true,
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
          port: 5000,
          middleware: function (connect, options) {
            var middlewares = options.base.map(function (base) { return connect.static(base); });
            middlewares.unshift(gruntConnectProxyUtils.proxyRequest);
            return middlewares;
          }
        }
      },
      proxies: [
        {
          context: [
            "/",
            "!/css/",
            "!/js/"
          ],
          host: "localhost",
          port: 3650
        }
      ]
    },
    watch: {
      options: {
        livereload: true
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

  grunt.registerTask("css",     ["compass:production"]);
  grunt.registerTask("js",      ["uglify:js"]);
  grunt.registerTask("build",   ["css", "js"]);
  grunt.registerTask("publish", ["shell:publish"]);

  grunt.registerTask("server",  ["configureProxies", "connect:app", "shell:riji", "watch"]);
  grunt.registerTask("default", ["server"]);

  grunt.task.run('notify_hooks');
};
