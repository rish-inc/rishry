const { src, dest, watch, series, parallel } = require('gulp');

//scss
const sass = require('gulp-sass');
const plumber = require("gulp-plumber");    // エラーが発生しても強制終了させない
const notify = require("gulp-notify");      // エラー発生時のアラート出力
const postcss = require("gulp-postcss");    // PostCSS利用
const cssnext = require("postcss-cssnext")  // CSSNext利用
const cleanCSS = require("gulp-clean-css"); // 圧縮
const rename = require("gulp-rename");      // ファイル名変更
const sourcemaps = require("gulp-sourcemaps");  // ソースマップ作成
const mqpacker = require('css-mqpacker');     //メディアクエリをまとめる

//js babel
// const babel = require("gulp-babel");
// const uglify = require("gulp-uglify");

//画像圧縮
// const imagemin = require("gulp-imagemin");
// const imageminMozjpeg = require("imagemin-mozjpeg");
// const imageminPngquant = require("imagemin-pngquant");
// const imageminSvgo = require("imagemin-svgo");


//postcss-cssnext ブラウザ対応条件 prefix 自動付与
const browsers = [
 'last 2 versions',
 '> 5%',
 'ie = 11',
 'not ie <= 10',
 'ios >= 8',
 'and_chr >= 5',
 'Android >= 5',
]

//参照元パス
const srcPath = {
 css: 'scss/**/**.scss',
 js: 'src/js/*.js',
 img: 'src/img/**/*',
}

//出力先パス
const destPath = {
 css: 'theme/assets/',
 js: 'dist/js/',
 img: 'dist/img/'
}


//sass
const compileScss = () => {
  return src(srcPath.css) //コンパイル元
  // .pipe(sourcemaps.init())//gulp-sourcemapsを初期化
  .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>')}))
  .pipe(sass({ outputStyle: 'expanded' }))
  // .pipe(postcss([mqpacker()])) // メディアクエリを圧縮
  .pipe(postcss([cssnext(browsers)]))//cssnext
  // .pipe(sourcemaps.write('/maps'))  //ソースマップの出力
  .pipe(rename({
    extname: '.css.liquid' //.min.cssの拡張子にする
  }))
  .pipe(dest(destPath.css))         //コンパイル先
  // .pipe(cleanCSS()) // CSS圧縮
}
  
const watchFile = () => {
  watch('scss/**/*.scss', compileScss);
}

exports.default = series(watchFile);
