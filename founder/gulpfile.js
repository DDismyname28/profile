
var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	sass = require('gulp-sass'),
	cleanCss = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  pipeline = require('readable-stream').pipeline;


/*const root          = '../src',
      scss          = root + 'scss',
      js            = root + 'js/',
      jsDist        = root + 'js/';

//const styleWatchFiles = scss + '**/

/*const jsSrc = [
      js + 'jquery.magnific-popup.min.js',
      js + 'slick.min.js',
      js + 'script.js'
];

function css() {
  return gulp.src(scss + 'style.scss', { sourcemaps: true })
    .pipe(scss({
      outputStyle: 'compressed'
    }).on('error', scss.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(root, { sourcemaps: '.' }));
}

function editorCSS() {
  return gulp.src(scss + 'style-editor.scss' )
    .pipe(scss({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest(root + 'dist/'));
}

function javascript() {
  return gulp.src(jsSrc)
    .pipe(concat('devwp.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDist));
}

function watch() {
    browserSync.init({
      open: 'external',
      proxy: 'http://localhost/dev/',
    });
    gulp.watch(styleWatchFiles, css);
    gulp.watch(styleWatchFiles, editorCSS);
    gulp.watch(jsSrc, javascript);
    gulp.watch([jsDist + 'devwp.js', root + 'style.css']).on('change', reload);
}

exports.css = css;
exports.editorCSS = editorCSS;
exports.javascript = javascript;
exports.watch = watch;

const build = gulp.series(watch);
gulp.task('default', build);


gulp.task('UGlify', () => {
  return pipeline(
    gulp.src('src/js/*.js'),
    uglify(),
    gulp.dest('src/min_js'));
})

gulp sourcesMaps autoprefixed sass CleanCSS UGlify

*/
gulp.task('sass', () => {
  return gulp.src('src/scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
})

gulp.task('sourcesMaps', () => {
  return gulp.src('src/scss/*.scss')
  .pipe(sourcemaps.init({loadMaps:true}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('src/css'));
})

gulp.task('autoprefixed', () => {
  return gulp.src('src/scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('src/css'));
})

gulp.task('CleanCSS', () => {
  return gulp.src('src/css/*.css')
  .pipe(cleanCss({compatibility: 'ie8'}))
  .pipe(gulp.dest('src/css'));
})

