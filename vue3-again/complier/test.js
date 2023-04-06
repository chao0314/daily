import {parse} from "./parser.js";
import {transform} from "./transform.js";
import {generate} from "./generate.js";

const template = `<div id="123" v-if="display" :name="name">
    <p>p1</p>
    <p>p2</p>
</div>`

function compile(tpl) {

    const ast = parse(tpl);

    transform(ast);


    const code = generate(ast.jsnode);

    // console.log(ast);
    console.log(code);
}


compile(template);