import {assert, merge, clone, handleOptions} from "./util";
import Request from "./request";
import Response from "./response";
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
        console.log("get", config);

    }

    post(...args) {
        let config = handleOptions(this.defaults, "post", ...args);
        console.log("post", config);

    }

    delete(...args) {
        let config = handleOptions(this.defaults, "delete", ...args);
        console.log("delete", config);

    }

    all(...args) {
        let config = handleOptions(this.defaults, void 0, ...args);
        console.log("all", config);
    }

}


Axios.create = Axios.prototype.create = function (option) {

    return new Axios(option);

};
export default Axios.create();