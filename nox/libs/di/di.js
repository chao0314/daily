const diLoader = require('./diLoader');

class DI {
    constructor(aNamespace) {
        if (new.target === DI) throw new Error('template Class DI');
        this.aNamespace = aNamespace || [];
    }


    mapInject(namespace, ...args) {

        if (!namespace) throw new Error("mapInject must have namespace");
        if (Array.isArray(args)) {

            args.forEach(name => {
                this[name] = diLoader.getDependence(namespace, name);
            })

        } else {

            Object.entries(args).forEach((name, key) => {

                this[key] = diLoader.getDependence(namespace, name);
            })

        }

    }


    _defaultGet(aNamespace, key, ...args) {
        if (Array.isArray(aNamespace) && !aNamespace.includes('extend')) aNamespace.push('extend');
        if (typeof aNamespace === 'string') aNamespace = [aNamespace];
        // aNamespace.find(namespace => diLoader.getDependence(namespace, key, ...args));
        console.log("di.js aNamespace", aNamespace);
        let dependence;
        for (let i = 0; i < aNamespace.length; i++) {
            dependence = diLoader.getDependence(aNamespace[i], key, ...args);
            if (dependence) break;

        }

        return dependence;


    }


    map(key, ...args) {
        return this._defaultGet(this.aNamespace, key, ...args);
    }

    mapByNamespace(namespace, key, ...args) {

        if (!this.aNamespace.includes(namespace)) throw  new Error(`only get dependence form  ${this.aNamespace}`);

        return diLoader.getDependence(namespace, key, ...args);

    }

    static mount(namespace, obj) {
        if (obj) {
            Object.entries(obj).forEach(([key, instance]) => diLoader.mount(namespace, key, instance));
        }

    }

}

exports = module.exports = DI;
