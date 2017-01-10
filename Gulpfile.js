var gulp = require('gulp'),
    argv = require('yargs').argv,
    foreach = require('gulp-foreach'),
    browserSync = require('browser-sync'),
    couchapp = require('gulp-couchapp'),
    install = require("gulp-install"),
    ensure = require('couchdb-ensure'),
    push = require('couchdb-push');

var dbHost = argv.host || '127.0.0.1';
var dbPort = argv.port || '5984';

var couchappOptions = {
    attachments: 'app'
};

couchappOptions.host = dbHost;
couchappOptions.port = dbPort;
if (argv.username && argv.password) {
    couchappOptions.auth = {
        username: argv.username,
        password: argv.password
    };
}

var dbName = argv.db || 'sliki';
var dbUrl = 'http://' + dbHost + ':' + dbPort + '/' + dbName;

gulp.task('install', function() {
    return gulp.src(['./bower.json', './package.json'])
        .pipe(install());
});

gulp.task('push', function() {
    // ensure db exists before pushing to it
    ensure(dbUrl, function(error, response) {
        return gulp.src('couchapp.js')
            .pipe(couchapp.push(dbName, couchappOptions));
    });
});

gulp.task('fixtures', function() {
    gulp.src('fixtures/*.json', {
            read: false
        })
        .pipe(foreach(function(stream, file) {
            push(dbUrl, file.path, function(err, resp) {
                if (err) {
                    console.error(err);
                }
                console.log(resp);
            });
        }));

});

gulp.task('browser-sync', function() {

    // for more browser-sync config options: http://www.browsersync.io/docs/options/
    browserSync({

        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: dbUrl + '/_design/sliki/_rewrite',

        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 4000,

        // open the proxied app in chrome
        //browser: ['google-chrome']
    });
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('default', ['install', 'push', 'browser-sync'], function() {
    gulp.watch(['couchapp.js', 'app/**/*.html', 'app/**/*.js', 'app/**/*.css'], ['push', 'bs-reload']);
});
