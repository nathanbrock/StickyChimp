(function () {
    "use strict";

    var LIVERELOAD_PORT = 35729;

    var lrSnippet = require('connect-livereload')({
        port: LIVERELOAD_PORT
    });

    var livereloadMiddleware = function (connect, options) {
        return [
            lrSnippet,
            connect.static(options.base),
            connect.directory(options.base)
        ];
    };

    module.exports = function (grunt) {
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),
            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> v<%= pkg.version %> */\n'
                },
                dist: {
                    files: {
                        'dist/<%= pkg.name %>.min.js': ['src/<%= pkg.name %>.js']
                    }
                }
            },
            jshint: {
                files: ['gruntfile.js', 'src/**/*.dev.js', 'test/spec/*.js', 'examples/**/*.js'],
                options: {
                    smarttabs: true,
                    globals: {
                        jQuery: true,
                        console: true,
                        module: true,
                        document: true,
                        require: true
                    }
                }
            },
            copy: {
                dist: {
                    files: [{
                        src: ['src/<%= pkg.name %>.js'],
                        dest: 'example/'
                    }]
                }
            },
            qunit: {
                all: ['test/**/*.html']
            },
            compress: {
                main: {
                    options: {
                        mode: 'gzip'
                    },
                    expand: true,
                    cwd: 'dist/',
                    src: ['<%= pkg.name %>.min.js'],
                    dest: 'dist/'
                }
            },
            bumper: {
                options: {
                    files: ['package.json'],
                    commit: false,
                    createTag: true,
                    tagName: 'v%VERSION%',
                    tagMessage: 'Version %VERSION%',
                    push: false,
                    runTasks: true,
                    tasks: ['jquerymanifest'],
                }
            },
            'gh-pages': {
                options: {
                    base: 'example',
                    message: 'Auto-generated commit for demo pages',
                },
                src: ['**']
            },
            connect: {
                client: {
                    options: {
                        port: 9000,
                        base: 'example',
                        middleware: livereloadMiddleware,
                        open: true
                    }
                }
            },
            watch: {
                client: {
                    files: ['src/**/*.js', 'example/**/*.html', 'example/**/*.css'],
                    tasks: ['jshint', 'copy'],
                    options: {
                        livereload: LIVERELOAD_PORT
                    }
                }
            },
            open: {
                all: {
                    path: 'http://localhost:<%= connect.options.port%>'
                }
            },
            jquerymanifest: {
                options: {
                    source: grunt.file.readJSON('package.json'),
                    overrides: {
                        title: '<%= pkg.title %>',
                    },
                }
            }
        });

        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-contrib-qunit');
        grunt.loadNpmTasks('grunt-contrib-compress');
        grunt.loadNpmTasks('grunt-gh-pages');
        grunt.loadNpmTasks('grunt-bumper');
        grunt.loadNpmTasks('grunt-open');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-connect');
        grunt.loadNpmTasks('grunt-jquerymanifest');

        /*grunt.registerTask('test', ['jshint', 'qunit']);*/
        
        grunt.registerTask('default', ['jshint', 'uglify', 'compress', 'copy']);
        
        // Local server for development.
        grunt.registerTask('server', ['jshint', 'copy', 'connect:client', 'watch:client']);
        
        // Push to gh-pages branch
        grunt.registerTask('push-demo', ['jshint', 'uglify', 'compress', 'copy', 'gh-pages']);
    };
})();