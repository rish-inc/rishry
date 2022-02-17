const { task, src, dest, watch, series, parallel } = require('gulp');

//scss
const sass       = require('gulp-sass')(require('sass'));
const plumber    = require("gulp-plumber");    // エラーが発生しても強制終了させない
const notify     = require("gulp-notify");      // エラー発生時のアラート出力
const postcss    = require("gulp-postcss");    // PostCSS利用
const cssnext    = require("postcss-cssnext")  // CSSNext利用
const cleanCSS   = require("gulp-clean-css"); // 圧縮
const rename     = require("gulp-rename");      // ファイル名変更
const sourcemaps = require("gulp-sourcemaps");  // ソースマップ作成
const mqpacker   = require('css-mqpacker');     //メディアクエリをまとめる
const sassGlob   = require('gulp-sass-glob-use-forward');
const cached     = require('gulp-cached');
const minimist   = require( 'minimist' );
const pug        = require("gulp-pug");

const browsersync = require("browser-sync").create();

const options = minimist( process.argv.slice( 2 ), {
  string: 'path',
  default: {
    path: 'http://127.0.0.1:9292' // 引数の初期値
  }
});

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
  rootDir: './',
  pug    : './pug/**/*pug',
  css    : './scss/**/**.scss',
  js     : './src/js/*.js',
  img    : './src/img/**/*',
}

//出力先パス
const destPath = {
 html: 'htdocs/',
//  css: 'theme/assets/',
 css:  'theme_export__rishry-com-boost-commerce-live-theme-with-filter-search-1__17FEB2022-0301pm/assets/',
 css2: 'htdocs/assets/css/',
 js:   'dist/js/',
 img:  'dist/img/'
}

// const server = () => {
//   return browsersync.init({
//     server: {
//       baseDir: "htdocs"
//     }
//   });
// }

// const reload = () => {
//   return browsersync.reload();
// }

const server = () => {
  return browsersync.init({
		notify: true
  });
}
const reload = (done) => {
  browsersync.reload();
  done();
}

//pug
const compilePug = () => {
  return src(['./pug/**/*.pug', '!./pug/**/_*.pug']) //コンパイル元
  .pipe(
    plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
  )
  .pipe(pug({
    basedir: './pug',
    pretty: true
  }))
  .pipe(dest('./htdocs'))         //コンパイル先
}

//sass
const compileScssShopify = () => {
  return src(srcPath.css, { sourcemaps: true }) //コンパイル元
  .pipe(sassGlob())
  .pipe( sass.sync().on( 'error', sass.logError ) )
  .pipe( cached( 'scss' ) )
  .pipe(sass({ outputStyle: 'expanded' }))
  // .pipe(postcss([mqpacker()])) // メディアクエリを圧縮
  .pipe(postcss([cssnext(browsers)]))//cssnext
  .pipe(dest('./' + destPath.css, { sourcemaps: './' + destPath.css }))         //コンパイル先
}

//sass
const compileScss = () => {
  return src(srcPath.css, { sourcemaps: true }) //コンパイル元
  .pipe(sassGlob())
  .pipe( sass.sync().on( 'error', sass.logError ) )
  .pipe( cached( 'scss' ) )
  .pipe(sass({ outputStyle: 'expanded' }))
  // .pipe(postcss([mqpacker()])) // メディアクエリを圧縮
  .pipe(postcss([cssnext(browsers)]))//cssnext
  .pipe( rename( { sass: true } ) )
  // .pipe(sourcemaps.write('/maps'))  //ソースマップの出力
  .pipe(dest('./htdocs/assets/', { sourcemaps: './' + destPath.css }))         //コンパイル先
  // .pipe(cleanCSS()) // CSS圧縮
}
  
// const watchFile2 = () => {
//   series(compileScss);
//   watch('scss/**/*.scss', compileScss2);
// }

const watchFile = () => {
  watch(srcPath.css, series( compileScssShopify, reload ) );
  // watch(srcPath.css, series(compileScss, reload));
  watch(srcPath.pug, series(compilePug, reload));
}

exports.compileScssShopify = compileScssShopify;

// ローカル開発 -> gulp
// exports.default = parallel(compileScss, compileScssShopify, watchFile, server);
// exports.default = parallel( compileScssShopify, watchFile, server );
exports.default = parallel( compileScssShopify, watchFile, server );
// exports.default = parallel( compileScss, watchFile, server );

// shopify用にコンパイル -> gulp build
exports.build = series(compileScssShopify);

// shopifyテーマの編集 -> theme watch（保存で反映するけどブラウザリロード必要）






































// // const { src, dest, watch } = require("gulp");
// // const sass = require("gulp-sass");
// // const pug = require("gulp-pug");

// // Sassをコンパイルする
// const compileSass = () =>
//    src("./scss/**/*.scss")
//    .pipe(
//        sass({
//            outputStyle: "expanded"
//        })
//    )
//    .pipe(dest("htdocs/assets/css"));

// // Sassファイルを監視
// const watchSassFiles = () => 
//   watch("./scss/**/*.scss", series(compileSass, reload));

// // pugをコンパイルする
// const compilePug22 = () =>
//    src("./pug/**/*.pug")
//    .pipe(
//        pug({
//            pretty: true,
//           basedir: './pug'
//        })
//    )
//    .pipe(dest("./htdocs"));

// // pugファイルを監視
// const watchPugFiles = () =>
//    watch("./pug/**/*.pug", series(compilePug22, reload));

// // npx gulpで実行される関数
// exports.default = () =>
//    watchSassFiles();
//    watchPugFiles();
//    server();






















// //watch
// task('watch', (done) => {
//   watch([paths.cssSrc], series('sass', 'reload'));
//   watch([paths.jsSrc], series('js', 'reload'));
//   watch([paths.pug], series('pug', 'reload'));
//   done();
// });

// task('html', (done) => {
//   watch([paths.cssSrc], series('sass', 'reload'));
//   watch([paths.jsSrc], series('js', 'reload'));
//   watch([paths.pug], series('pug', 'reload'));
//   done();
// });

// const testtest = () => {
//   console.log('test');
// }

// task("sample", (done) => {
//   console.log("gulp 4 success!");
//   done();
// });

// exports.default = series(watchFile);

// // exports.html = series(watchFile2);

// gulp.task('browser-sync', function(done) {
//   browserSync.init({
//     //ローカル開発
//     server: {
//       baseDir: dir.dest,
//       index: "index.html"
//     }
//   });
//   done();
// });


// gulp.task('sass', (done) => {
//   gulp
//     .src([dir.src + "scss/**/*.scss", '!' + dir.src + "scss/**/_*.scss"])
//     .pipe($.plumber({
//       errorHandler: $.notify.onError("Error: <%= error.message %>")
//     })) // エラー時にプロセスが落ちないようにする
//     .pipe(sassGlob()) //importの読み込みを簡潔にする
//     .pipe($.sass({
//       outputStyle: 'expanded' //expanded, nested, campact, compressedから選択
//     }))
//     .pipe(postcss([autoprefixer({
//       cascade: false
//     })]))
//     .pipe(postcss([cssdeclsort({
//       order: 'smacss'
//     })])) //プロパティをソートし直す
//     // alphobetically アルファベット順に
//     // smacss SMACSSが定義するレイアウトに最も重要な順に
//     // concentric-css Concentric CSSが提唱するボックスモデルの外側から内側の順に
//     .pipe(cleanCSS())
//     .pipe(gulp.dest(dir.dest + 'css')) //コンパイル後の出力先
//   done()
// });










