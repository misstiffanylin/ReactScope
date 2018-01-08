import gulp from 'gulp';
import rm from 'gulp-rm';
import webpack from 'webpack';
import fs from 'fs';

const paths = {
    build: './chrome'
};

//Clean 
gulp.task('clean', () => {
    return gulp
    .src(`${paths.build}/**/*`, {read: false})//
    .pipe(rm());
});

//rm()
//Passing { read: false } to gulp.src() prevents gulp from reading in the contents of files and thus speeds up the whole process.
//build components

gulp.task('build:app', (done) => {
    webpack(require('./webpack.config.js'), done);
});

//copy files into build folder 
const files = [
    './manifest.json',
    './src/index.html',
    './src/devtools/devtools.html',
    './src/devtools/devtools.js',
    './src/backend/hook.js'
];
gulp.task('copy:static', (done) => {
    gulp 
        .src(files) //to read the files so it knows what they are
        .pipe(gulp.dest(paths.build)) //copy the files and send them to the destination folder
        .on('end', done); //finished
})

//build
gulp.task('build', gulp.series([
    'clean',
    'build:app',
    'copy:static'
]));