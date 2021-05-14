import Vue from "./Vue";
import {Vuex} from "./vuex";
import Router from "./router";

let comp1 = {
    template: `<div @click="click"> this is {{name}} and test $emit $on </div>`,
    props: ["parentMsg"],
    data() {
        return {
            name: "cmp 1"
        }
    },
    methods: {
        click(e) {
            alert(this.parentMsg);
            alert(this.$store.state.msg);
            this.$emit("hello", `hello $emit event ${this.name}`);
        }
    }

};

let comp2 = {
    template: `<div> this is {{name}} <br><slot></slot></div>`,
    data() {
        return {
            name: "cmp 2"
        }
    }
};

let comp3 = {
    template: `<div>this is comp3</div>`
};
let comp4 = {
    template: `<div>this is comp4</div>`
};

Vue.component("comp2", comp2);


let store = new Vuex({
    strict: false,
    state: {
        msg: "this data come form  vuex",
        prefix: "vuex prefix"
    },
    mutations: {
        setMsg(state, payload) {
            console.log("mutation");
            state.msg = payload;
        }
    },
    actions: {
        setMsg(store, payload) {
            console.log("action");
            store.commit("setMsg", payload);
        }
    },
    getters: {
        prefixMsg(state) {
            return `${state.prefix} ${state.msg}`;
        }
    }


});
let router = new Router({
    routes: [
        {path: "/comp3", component: comp3},
        {path: "/comp4", component: comp4}
    ]
});

window.vm = new Vue({
    el: "#root",
    store,
    router,
    data: {
        title: "this is title",
        msg: "hello world",
        show: true,
        has: false,
        html: "<strong>hello world</strong>",
        vtext: "vtext render",
        arr: ["a", "b", "c"],
        parentMsg: "this prop form parent"
    },
    mounted() {
        console.log("mounted");
        this.$on("hello", function(payload) {
            console.log(`${this.title} this message come from $emit ${payload}`);
        })
    }
    ,
    methods: {
        click(e) {
            console.log(e);
            alert("click");
        },
        setData(e) {
            this.$store.dispatch("setMsg", "hahahahahahahaha vuex");
        }
    },
    watch: {
        vtext(oldValue, newValue) {
            this.arr.push("new");
        }

    },
    computed: {
        sum() {
            return this.arr.join("");
        }
    },
    filters: {
        format(value) {
            return `through filters ${value}`;
        }
    },
    components: {
        comp1
    }
});