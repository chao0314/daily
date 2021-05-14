import {isObj, assert} from "./util";

export default class {
    constructor() {
        this.interceptors = [];
        this.errorIntercepotrs = [];
    }

    use(cb, err) {
        assert(cb instanceof Function);
        assert(!err || (err && err instanceof Function));
        if (cb && err) return [this.interceptors.push(cb) - 1, this.errorIntercepotrs.push(err) - 1];
        else if (cb) return [this.interceptors.push(cb) - 1];
        else if (err) return [null, this.errorIntercepotrs.push(err) - 1];
    }

    async iterator(config, type) {
        let interceptors;
        if (type === "error") interceptors = this.errorIntercepotrs;
        else interceptors = this.interceptors;
        for (let i = 0; i < interceptors.length; i++) {
            try {
                config = await interceptors[i](config);
                assert(isObj(config), "interceptors function return invalid");
            } catch (e) {
                return Promise.reject(e);

            }
        }


        return config;
    }


    remove(id, errid) {
        if (id && errid) return [this.interceptors.splice(id, 1), this.errorIntercepotrs.splice(errid, 1)];
        else if (id) return this.interceptors.splice(id, 1);
        else if (errid) return this.errorIntercepotrs.splice(id, 1);
    }
}