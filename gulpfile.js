const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); /*importar o gulp-sass (responsavel por integrar o sass com gulp e quem transforma o arquivo sass em css é o 'sass'*/
const sourcemaps = require('gulp-sourcemaps'); 
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/imagens/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}

function compilaSass() { /*função não precisa de callback, pois ela tem retorno */
    return gulp.src('./source/styles/main.scss') 
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed'
    })) /*recebe a funcao sass, o pipe tem o papel de encadear as funcoes que vamos utilizar */ /*linha de execução */
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/styles')); /*envia os arquivos para a pasta */
}


exports.default = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavaScript));
    gulp.watch('./source/imagens/*', { ignoreInitial: false }, gulp.series(comprimeImagens));

}
