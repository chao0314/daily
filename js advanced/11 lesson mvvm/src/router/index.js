import Vue from "../Vue";
import {assert} from "../utils";

Vue.component("router-link", {
    template: `<a :href="'#'+to"><slot></slot></a>`
});
Vue.component("router-view", {
    template: `<div class="router-view"> this is a router-view</div>`
});

export default class Router {
    constructor(option) {
        this.routes = option.routes;
        this.route = null;
        this.context = null;
        assert(this.routes && this.routes instanceof Array);
        this.init();
        window.addEventListener("DOMContentLoaded", () => {
            this.handleHash();
        })
    }

    init() {
        window.addEventListener("hashchange", () => {
            this.handleHash();
        })

    }

    handleHash() {
        let route = location.hash.slice(1);
        let component = this.routes.find(item => item.path === route).component;
        assert(component);
        //todo parent is router-view normal
        component = Vue.extend(component, null, this.context);

        let views = document.querySelectorAll(".router-view");
        views.forEach(view => {
            view.innerHTML = component.$el.innerHTML;
        });
        this.route = route;
    }


}