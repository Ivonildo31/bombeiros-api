/**
 * Created by clayton silva 26/06
 */
let gulp = require('gulp')
var serverCompiled = [ serverPath + '**/*.js', serverPath + '**/*.js.map', serverPath + '**/*.d.ts'].map(el => serverPath + el)
var ts = require('gulp-typescript')
var clean = require('gulp-clean')
var path = require('path')
var sourcemaps = require('gulp-sourcemaps')
var mocha = require('gulp-mocha')
var istanbul = require('gulp-istanbul')
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul')
var jsdoc = require('gulp-jsdoc3')
var tsProject = ts.createProject('tsconfig.json')
var serverPath = './server/'



gulp.task('ts', ['clean'], function () {
  return tsProject
        .src()
        .pipe(tsProject())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: path.join(__dirname, serverPath), destPath: serverPath}))
        .pipe(gulp.dest(serverPath))
})

gulp.task('clean', function () {
  return gulp
        .src(serverCompiled, {read: false})
        .pipe(clean())
})

gulp.task('server:start', ['ts'], function () {
  server.listen({path: serverPath + 'bin/www'}, function (error) {
    console.log(error)
  })
})

gulp.task('server:restart', ['ts'], function () {
  server.restart()
})

gulp.task('default', ['server:start'], function () {
  gulp.watch(serverTS, ['server:restart'])
})

gulp.task('test', ['ts'], function () {
  return gulp
        .src('server/**/*.Spec.js', {read: false})
        // wait for dev server to start properly :(
        // .pipe(wait(600))
        .pipe(mocha())
        .once('error', function () {
          process.exit(1)
        })
        .once('end', function () {
          process.exit()
        })
})
