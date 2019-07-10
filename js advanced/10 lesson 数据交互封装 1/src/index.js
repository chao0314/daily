import {assert, merge, clone, handleOptions} from "./util";
import request from "./request";
import response from "./response";
import defaults from "./default";
import Interceptor from "./interceptor";

class Axios {
    constructor(option) {
        this.defaults = merge(clone(defaults), option || {});
        this.interceptos = {
            request: new Interceptor(),
            response: new Interceptor()
        };
        let that = this;
        return new Proxy(this.all, {
            apply(target, thisArg, argArray) {
                return Reflect.apply(that.all, that, argArray);
            },
            set(target, p, value) {
                return Reflect.set(that, p, value);
            },
            get(target, p) {
                return Reflect.get(that, p);
            }
        })

    }

    get(...args) {
        let config = handleOptions(this.defaults, "get", ...args);
       // console.log("get", config);
        return this._request(config);

    }

    post(...args) {
        let config = handleOptions(this.defaults, "post", ...args);
        //console.log("post", config);
        return this._request(config);

    }

    delete(...args) {
        let config = handleOptions(this.defaults, "delete", ...args);
        //console.log("delete", config);
        return this._request(config);

    }

    all(...args) {
        let config = handleOptions(this.defaults, void 0, ...args);
       // console.log("all", config);
        return this._request(config);
    }

    async _request(config) {
        let res;
        let {transformRequest, transformResponse, data} = config;
        config.data = transformRequest(data);
        config = await this.interceptos.request.iterator(config);
        try {
            res = response(await request(config));
            res.data = transformResponse(res.data);
            res = await this.interceptos.response.iterator(res);
            return res;
        } catch (e) {
            return await this.interceptos.response.iterator(e, "error");
        }

    }

}


Axios.create = Axios.prototype.create = function (option) {

    return new Axios(option);

};
export default Axios.create();