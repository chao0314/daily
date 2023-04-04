import {parse} from "./parser.js";

const template = `<div id="123" v-show="display" :name="name">
    <p>p1</p>
    <p>p2</p>
    <p>{{value}}</p>
</div>`

console.log(parse(template));