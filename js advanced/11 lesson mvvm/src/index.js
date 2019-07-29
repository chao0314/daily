import Vue from "./vue";

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
        }
    }

};

let comp2 = {
    template: `<div> this is {{name}}</div>`,
    data() {
        return {
            name: "cmp 2"
        }
    }
};

Vue.component("comp2", comp2);

window.vm = new Vue({
    el: "#root",
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