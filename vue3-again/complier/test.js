import {parse} from "./parser.js";
import {transform} from "./transform.js";

const template = `<div id="123" v-if="display" :name="name">
    <p>p1</p>
    <p>{{value}}</p>
</div>`

const tplAST = parse(template);

console.log(tplAST);

console.log(transform(tplAST));

