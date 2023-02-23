const render = require('koa-ejs');
const {minify} = require('html-minifier');
const pfs = require('promise-fs');
const path = require('path');

module.exports = async function (app) {
    if (!app.context.appConfig.templateDir) return;
    await render(app, {
        root: app.context.appConfig.templateDir,
        layout: false,
        viewExt: 'ejs',
        cache: false,
        debug: false,
        async: false
    });

    let originalRender = app.context.render;
    app.context.render = async function (name, options = {}) {
        await originalRender.call(this, name, {...this.defaultRenderOptions, ...options});
        if (this.appConfig.minifyHtml)
            this.body = minify(this.body, {
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                minifyCSS: true,
                minifyJS: true
            });


    };

    app.context.writeCache = async function (name, content) {
        await pfs.writeFile(path.resolve(this.appConfig.cacheDir, name), content);
    };
    app.context.setDefaultRenderOptions = function (name, value) {

        if (this.defaultRenderOptions === void 0) this.defaultRenderOptions = {};
        this.defaultRenderOptions[name] = value;

    };
    app.context.getDefaultRenderOptions = function (name) {

        return this.defaultRenderOptions ? this.defaultRenderOptions[name] : void 0;
    }


};