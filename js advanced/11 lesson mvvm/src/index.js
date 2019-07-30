import Vue from "./vue";
import {Vuex} from "./vuex";

let comp1 = {
    template: `<div @click="click"> this is {{name}}</div>`,
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
        }
    }

};

let comp2 = {
    template: `<div> this is {{name}} <br>
                    <slot></slot>
                </div>`,
    data() {
        return {
            name: "cmp 2"
        }
    }
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

window.vm = new Vue({
    el: "#root",
    store,
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