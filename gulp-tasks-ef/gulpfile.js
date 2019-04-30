const { src, dest, series, watch } = require(`gulp`);
const del = require(`del`);
const sass = require(`gulp-sass`);
const babel = require(`gulp-babel`);
const htmlCompressor = require(`gulp-htmlmin`);
const htmlValidator = require(`gulp-html`);
const jsLinter = require(`gulp-eslint`);
const jsCompressor = require(`gulp-uglify`);
const imageCompressor = require(`gulp-imagemin`);
const cache = require(`gulp-cache`);
const browserSync = require(`browser-sync`);
const reload = browserSync.reload;

let compressHTML = () => {
    return src([`dev/html/*.html`,`dev/html/**/*.html`])
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod/html`));
};

let validateHTML = () => {
    return src([
        `dev/html/*.html`,
        `dev/html/**/*.html`])
        .pipe(htmlValidator());
};



let compileCSSForDev = () => {
    return src(`dev/styles/style.scss`)
        .pipe(sass({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`temp/styles`));
};

let compileCSSForProd = () => {
    return src(`dev/styles/style.scss`)
        .pipe(sass({
            outputStyle: `compressed`,
            precision: 10
        }).on(`error`, sass.logError))
        .pipe(dest(`prod/styles`));
};

let transpileJSForDev = () => {
    return src(`dev/scripts/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/scripts`));
};

let transpileJSForProd = () => {
    return src(`dev/scripts/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/scripts`));

};

let lintJS = () => {
    return src(`dev/scripts/*.js`)
        .pipe(jsLinter({
            parserOptions: {
                ecmaVersion: 2017,
                sourceType: `module`
            },
            rules: {
                indent: [2, 4, {SwitchCase: 1}],
                quotes: [2, `backtick`],
                semi: [2, `always`],
                'linebreak-style': [2, `unix`],
                'max-len': [1, 85, 4]
            },
            env: {
                es6: true,
                node: true,
                browser: true
            },
            extends: `eslint:recommended`
        }))
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};

let copyUnprocessedAssetsForProd = () => {
    return src([
        `dev/*.*`,       // Source all files,
        `dev/**`,        // and all folders,
        `!dev/html/`,    // but not the HTML folder
        `!dev/html/*.*`, // or any files in it
        `!dev/html/**`,  // or any sub folders;
        `!dev/img/`,     // ignore images;
        `dev/**/*.js`,  // ignore JS;
        `!dev/styles/**` // and, ignore Sass/CSS.
    ], {dot: true}).pipe(dest(`prod`));
};

let compressImages = () => {
    return src(`dev/img/**/*`)
        .pipe(cache(
            imageCompressor({
                optimizationLevel: 3, // For PNG files. Accepts 0 – 7; 3 is default.
                progressive: true,    // For JPG files.
                multipass: false,     // For SVG files. Set to true for compression.
                interlaced: false     // For GIF files. Set to true for compression.
            })
        ))
        .pipe(dest(`prod/img`));
};

let serve = () => {
    browserSync({
        notify: true,
        port: 9000,
        reloadDelay: 50,
        server: {
            baseDir: [
                `dev`,
                `dev/styles`,
                `dev/html`,
                `dev/scripts`
            ]
        }
    });

    watch(`dev/styles/**/*.scss`,
        series(compileCSSForDev)
    ).on(`change`, reload);

    watch(`dev/html/**/*.html`,
        series(validateHTML)
    ).on(`change`, reload);

    watch(`dev/scripts/*.js`,
        series(lintJS, transpileJSForDev)
    ).on(`change`, reload);

    watch(`dev/img/**/*`).on(`change`, reload);
};

exports.validateHTML = validateHTML;
exports.compressHTML = compressHTML;
exports.compileCSSForDev = compileCSSForDev;
exports.compileCSSForProd = compileCSSForProd;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.lintJS = lintJS;
exports.copyUnprocessedAssetsForProd = copyUnprocessedAssetsForProd;
exports.default = series(
    serve, 
    compileCSSForDev, 
    transpileJSForDev, 
    validateHTML);
exports.build = series(
    validateHTML,
    compressHTML,
    compileCSSForProd,
    lintJS,
    transpileJSForProd,
    compressImages,
    copyUnprocessedAssetsForProd
);
exports.compressImages = compressImages;
exports.serve = serve;
