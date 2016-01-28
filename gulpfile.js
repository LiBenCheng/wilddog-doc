var gulp = require('gulp');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var fontmin = require('gulp-fontmin');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var fontmin = require('gulp-fontmin');
gulp.task('clean', function () {
    return gulp.src('dist', {
            read: false
        })
        .pipe(clean());
});
gulp.task('copy', function () {
    return gulp.src(['bower_components/**/*.*','views/**/*.html','config.js','app.js','bin/www','markdown-toc.js','marked.js','raneto.js','content/**/*.*','package.json','public/*.*','public/fonts/**/*.*'],{base:'.','buffer':false})
        .pipe(gulp.dest('dist'));
})

gulp.task('css',function(){
    return gulp.src('public/css/**/*.css',{base:'.'})
        .pipe(csso())
        .pipe(gulp.dest('dist'))
})
gulp.task('js',function(){
    return gulp.src('public/scripts/**/*.js',{base:'.'})
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
})
gulp.task('image',function(){
     return gulp.src('public/images/**/*.{svg,png,jpg}',{base:'.'})
        .pipe(imagemin({
            progressive:true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('dist'))
    
})


gulp.task('font',['copy'],function(done){
    var buffers = [];
    gulp
        .src(['views/**/*.html'])
        .on('data', function (file) {
            buffers.push(file.contents);
        })
        .on('end', function () {
            var text = Buffer.concat(buffers).toString('utf-8');
            gulp.src('public/fonts/fzltxh.ttf')
                .pipe(fontmin({
                    text:text
                }))
                .pipe(gulp.dest('dist/public/fonts'))
                .on('end',done)
        });
})

gulp.task('build',['copy','css','js','image','font'])
