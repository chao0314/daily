const { series, src, dest } = require('gulp')
const sass = require('gulp-dart-sass')
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')


function compile() { // 处理scss文件
    return src('./src/*.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({}))
    .pipe(cssmin())
    .pipe(dest('./lib'))
}
function copyFont(){ // 拷贝字体文件
    return src('./src/fonts/**').pipe(cssmin()).pipe(dest('./lib/fonts'))
}

exports.build = series(compile,copyFont)