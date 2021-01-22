const {traversal} = require('@/utils');
const {diDir} = require('@/config');
const nativePath = require('path');


class DILoader {

    constructor(dir) {
        console.log('di controller constructor');

        this._dir = dir;

        this._container = {
            store: {},
            extend: {}
        };
        this._index = 0;
    }

    mount(namespace, key, instance) {
        this._container[namespace][key] = instance;

    }

    inject(directory) {
        let dir = directory || this._dir;

        return new Promise((resolve) => {

            Object.entries(dir).map(([name, path]) => {
                if (path) {
                    if (name === 'router') this._container[name] = traversal(path, "/");
                    else this._container[name] = traversal(path);

                    this._container[name].then(paths => {
                        this._container[name] = {};
                        paths.forEach(filepath => {
                            // let index = filepath.lastIndexOf("/");
                            // let [, filename] = filepath.slice(index).match(/(\w+).js$/);
                            let filename;
                            if (name === 'router') {
                                filename = filepath.route;
                                filepath = filepath.filepath;
                            } else {
                                filename = nativePath.parse(filepath).name;
                            }

                            this._container[name][filename] = filepath;

                        });
                        if (++this._index === Object.keys(dir).length)
                            resolve(console.log(`dependence file ready (${this._index} dir)`));
                    })
                }
            })


        })


    }

    getDependence(namespace, name, ...args) {

        if (arguments.length === 1) return this._container[namespace];
        if (namespace === 'store' && name) return this._container[namespace][name];
        if (namespace === 'extend' && name) return this._container[namespace][name];
        if (namespace === 'router' && name) throw new Error('not get router');
        let uri = this._container[namespace][name];
        if (uri) return require(this._container[namespace][name]);

        //if (namespace === 'extend') return dependence;
        //class     or     single instance
        // else return dependence.hasOwnProperty('prototype') ? new dependence(...args) : dependence;

        // return dependence.hasOwnProperty('prototype') ? new dependence(...args) : dependence;


    }

    removeDependence(namespace, name) {
        console.log('remove namespace', namespace);
        if (arguments.length === 1) delete this._container[namespace];
        else delete this._container[namespace][name];

    }
}

exports = module.exports = new DILoader(diDir);
