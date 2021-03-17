import HashHistory from "@/m-router/history/HashHistory";
import H5History from "@/m-router/history/H5History";
import install from "@/m-router/install";

export default class Router {

    constructor(options) {
        const {mode = 'hash', routes = []} = options;
        this.history = mode === 'hash' ? new HashHistory() : new H5History();
        this


    }

    init(vm) {


    }

}

Router.install = install;