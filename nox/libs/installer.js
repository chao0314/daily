const path = require('path');
// const installMiddleware = require('./installMiddleware');
const installRouter = require('./installRouter');
const diLoader = require('./di/diLoader');


exports = module.exports = class Installer {

    constructor(app, options = {dir: {}}) {
        this.app = app;
        let {dir: {routerDir, controllerDir, serviceDir, daoDir, modelDir, extendDir}} = options;
        this.dir = {
            "router": routerDir || path.resolve(__dirname, '../app/router'),
            "controller": controllerDir || path.resolve(__dirname, '../app/controller'),
            "service": serviceDir || path.resolve(__dirname, '../app/service'),
            "dao": daoDir || path.resolve(__dirname, '../app/dao'),
            "model": modelDir || path.resolve(__dirname, '../app/model')
        }
        // let {middlewareDir} = options;
        // this.middlewareDir = middlewareDir || path.resolve(__dirname, '../middleware');
    }

    async install() {

        try {
            // await installMiddleware(this.middlewareDir);
            await diLoader.inject(this.dir);
            await new installRouter().install(this.app);
        } catch (e) {
            console.log(e)
            throw e;
        }

    }


}