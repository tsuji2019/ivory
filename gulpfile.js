/* =========================================================
  Import
========================================================= */
/* ---------------------------------------------------------
  common
--------------------------------------------------------- */
const gulp = require('gulp');
const browserSync = require('browser-sync');
const ssi = require('connect-ssi'); //　'browser-sync'でssiを見る
const del = require('del'); // ファイル削除
const plumber = require('gulp-plumber'); // エラー強制停止の防止
const notify = require('gulp-notify'); // エラー通知

/* ---------------------------------------------------------
  pug
--------------------------------------------------------- */
const pug = require('gulp-pug');
const fs = require('fs'); // ファイル操作
const data = require('gulp-data'); // metaのjson管理
const gzip = require('gulp-gzip'); // gzip
const htmlmin = require('gulp-htmlmin'); // html圧縮

/* ---------------------------------------------------------
  sass
--------------------------------------------------------- */
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer'); // ベンダープリフィックス付与
const cleanCSS = require('gulp-clean-css'); // css圧縮
const gcmq = require('gulp-group-css-media-queries'); // メディアクエリを一箇所にまとめる
const sassGlob = require('gulp-sass-glob'); // import設定の簡略化
const postcss = require('gulp-postcss'); // ポストプロセッサー
const cssSort = require('css-declaration-sorter'); // css sort
const cssImport = require('postcss-import'); // import可能にする


/* ---------------------------------------------------------
  javascript
--------------------------------------------------------- */
const webpackStream = require('webpack-stream'); // エラー強制停止の防止
const webpack = require('webpack');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default; // es minify
const webpackConfig = require('./webpack.config');

/* ---------------------------------------------------------
  image
--------------------------------------------------------- */
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const pngquant = require('imagemin-pngquant');
const svgo = require('imagemin-svgo');
const svgSprite = require('gulp-svg-sprite');
const changed = require('gulp-changed'); // 変更されたファイルのみ処理

/* =========================================================
  settings
========================================================= */
const paths = {
  favicon: './_src/favicon.ico',
  faviconDist: './_dist/',
  font: [
    './_src/assets/font/*.woff',
  ],
  fontDist: './_dist/assets/font/',
  styles: [
    './_src/assets/styles/*.scss',
    './_src/assets/styles/**/*.scss',
    './_src/assets/styles/**/**/*.scss'
  ],
  stylesDist: './_dist/assets/css/',
  css: ['./_dist/assets/css/*.css'],
  pug: [
    './_src/*.pug',
    './_src/**/*.pug',
    './_src/**/**/*.pug',
    '!./_src/_*.pug',
    '!./_src/**/_*.pug',
    '!./_src/**/**/_*.pug'
  ],
  pugComponents: ['./_src/_*.pug', './_src/**/_*.pug', './_src/**/**/_*.pug'],
  pugDist: './_dist/',
  html: ['./_src/*.html', './_src/**/*.html'],
  htmlDist: ['./_dist/*.html', './_dist/**/*.html'],
  js: ['./_src/assets/js/*.js', './_src/assets/js/**/*.js'],
  jsDist: './_dist/assets/js/',
  distJs: ['./_dist/assets/js/*.js', './_dist/**/*.js'],
  image: ['./_src/assets/images/**/*'],
  imageDist: './_dist/assets/images/',
  svg: ['./_src/assets/svg/**/*'],
  svgDist: './_dist/assets/svg/',
  dist: './_dist/',
  meta: './_src/_data/meta.json',
  compressHtml: ['./_compress/'],
  compressCss: ['./_compress/assets/css/'],
  compressJs: ['./_compress/assets/js/'],
};

/* =========================================================
  Task
========================================================= */
/* ---------------------------------------------------------
  pug
--------------------------------------------------------- */
function pugFunc(done) {
  const option = {
    pretty: true
  };
  return gulp
    .src(paths.pug)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(
      data(function() {
        return JSON.parse(fs.readFileSync(paths.meta));
      })
    )
    .pipe(pug(option))
    .pipe(gulp.dest(paths.pugDist))
    .pipe(browserSync.reload({ stream: true }));
}


/* ---------------------------------------------------------
  html minify
--------------------------------------------------------- */
function pugDistFunc(done) {
  const option = {
    pretty: true
  };
  return gulp
    .src(paths.pug)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(
      data(function() {
        return JSON.parse(fs.readFileSync(paths.meta));
      })
    )
    .pipe(pug(option))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.pugDist))
    .pipe(browserSync.reload({ stream: true }));
}


/* ---------------------------------------------------------
  sass
--------------------------------------------------------- */
function stylesFunc() {
  const plugins = [
    cssImport({
      path: ['node_modules']
    })
  ];
  return gulp
    .src(paths.styles, {
      sourcemaps: true
    })
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: 'expanded'
      })
    )
    .pipe(postcss(plugins))
    .pipe(cleanCSS())
    .pipe(
      autoprefixer({
        cascade: false,
        grid: 'autoplace'
      })
    )
    .pipe(postcss([cssSort({order:'smacss'})]))
    .pipe(
      gulp.dest(paths.stylesDist, {
        sourcemaps: './sourcemaps'
      })
    )
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

function stylesDistFunc() {
  const plugins = [
    cssImport({
      path: ['node_modules']
    })
  ];

  return gulp
    .src(paths.styles, {
      sourcemaps: false
    })
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
    )
    .pipe(postcss(plugins))
    .pipe(cleanCSS())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(gcmq())
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
    )
    .pipe(gulp.dest(paths.stylesDist))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}


/* ---------------------------------------------------------
  image
--------------------------------------------------------- */
function imageFunc() {
  return gulp
    .src(paths.image)
    .pipe(changed(paths.imageDist))
    .pipe(
      imagemin(
        [
          mozjpeg({
            quality: 80
          }),
          pngquant({
            quality: [0.7, 0.85]
          })
        ],
        {
          verbose: true // All log
        }
      )
    )
    .pipe(gulp.dest(paths.imageDist))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

/* ---------------------------------------------------------
  svg
--------------------------------------------------------- */
function svgFunc() {
  return gulp
    .src(paths.svg)
    .pipe(changed(paths.svgDist))
    .pipe(
      svgSprite(
        {
          mode: {
            symbol: {
              // sprite name
              sprite: 'sprite.svg',

              // example
              example: {
                dest: '../preview/sprite.html',
              }
            },
          }, // mode
          shape : {
            transform: [
              {
                svgo: {
                  plugins: [
                    { 'prefixIds': false },
                    { 'cleanupIDs': false },
                    { 'removeTitle': true },
                    { 'removeStyleElement': true },
                    { 'removeAttrs': { 'attrs': 'fill' } },
                    { 'removeXMLNS': true },
                    { 'removeDimensions': true }
                  ]
                }
              }
            ]
          },
          svg : {
            xmlDeclaration: false
          }
        }
      )
    )
    .pipe(gulp.dest(paths.svgDist))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}


/* ---------------------------------------------------------
  js
--------------------------------------------------------- */
function jsFunc() {
  return plumber({
    errorHandler: notify.onError('Error: <%= error.message %>')
  })
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsDist))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}


/* ---------------------------------------------------------
  font
--------------------------------------------------------- */
function fontFunc() {
  return gulp
    .src(paths.font)
    .pipe(gulp.dest(paths.fontDist))
}

/* ---------------------------------------------------------
  favicon
--------------------------------------------------------- */
function faviconFunc() {
  return gulp
    .src(paths.favicon)
    .pipe(gulp.dest(paths.faviconDist))
}


/* ---------------------------------------------------------
  image
--------------------------------------------------------- */
function imageFunc() {
  return gulp
    .src(paths.image)
    .pipe(changed(paths.imageDist))
    .pipe(
      imagemin(
        [
          mozjpeg({
            quality: 80
          }),
          pngquant({
            quality: [0.7, 0.85]
          })
        ],
        {
          verbose: true // All log
        }
      )
    )
    .pipe(gulp.dest(paths.imageDist))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}


/* ---------------------------------------------------------
  server
--------------------------------------------------------- */
const browserSyncOptions = {
  port: 3000,
  reloadOnRestart: true,
  server: {
    baseDir: paths.dist,
    index: 'index.html',
    middleware: [
      ssi({
        baseDir: __dirname + '/_dist',
        ext: '.html'
      })
    ]
  },
  ghostMode: {
    clicks: false,
    forms: false,
    scroll: false
  }
};

function browserSyncFunc(done) {
  browserSync.init(browserSyncOptions);
  done();
}

/* ---------------------------------------------------------
  clean
--------------------------------------------------------- */

function cleanFunc(done) {
  del.sync(['./_dist']);
  done();
}

/* ---------------------------------------------------------
  watch
--------------------------------------------------------- */
function watchFunc(done) {
  const browserReload = function() {
    browserSync.reload({
      stream: true
    });
    done();
  };
  gulp.watch(paths.pug).on('change', gulp.series(pugFunc, browserReload));
  gulp
    .watch(paths.pugComponents)
    .on('change', gulp.series(pugFunc, browserReload));
  gulp.watch(paths.styles).on('change', gulp.series(stylesFunc, browserReload));
  gulp.watch(paths.js).on('change', gulp.series(jsFunc, browserReload));
  gulp.watch(paths.image).on('change', gulp.series(imageFunc, browserReload));
  gulp.watch(paths.svg).on('change', gulp.series(svgFunc, browserReload));
  done();
}

/* =========================================================
  Task main
========================================================= */
/* ---------------------------------------------------------
  gulp
--------------------------------------------------------- */
gulp.task(
  'default',
  gulp.series(
    gulp.parallel(pugFunc, stylesFunc, jsFunc, faviconFunc, fontFunc, imageFunc, svgFunc),
    gulp.series(browserSyncFunc, watchFunc)
  )
);

gulp.task(
  'build',
  gulp.series(
    gulp.series(cleanFunc),
    gulp.parallel(pugDistFunc, stylesDistFunc,jsFunc, faviconFunc, fontFunc, imageFunc, svgFunc),
  )
);


/* =========================================================
  Task compress
========================================================= */
gulp.task(
  'compress',
  function(done){
	gulp.src(paths.htmlDist)
		.pipe(gzip({ skipGrowingFiles : true }))
		.pipe(gulp.dest(paths.compressHtml));
	gulp.src(paths.css)
		.pipe(gzip({ skipGrowingFiles : true }))
		.pipe(gulp.dest(paths.compressCss));
	gulp.src(paths.distJs)
		.pipe(gzip({ skipGrowingFiles : true }))
		.pipe(gulp.dest(paths.compressJs));
  done();
});
