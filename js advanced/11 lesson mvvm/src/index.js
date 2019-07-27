import proxy from "./proxy";
import {domParser} from "./parser"
import {exp} from "./expression";
import Vue from "./vue";


window.vm = new Vue({
    el: "#root",
    data: {
        title: "this is title",
        msg: "hello world",
        show: true,
        has: false,
        html: "<strong>hello world</strong>",
        vtext: "vtext render",
        arr: ["a", "b", "c"]
    },
    methods: {
        click(e) {
            console.log(e);
            alert("click");
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
    }
});