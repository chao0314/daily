import {reactive} from "../reactivity/index.js";
import {observerOption} from "./options.js";
import {createRenderer} from "./index.js";

const vnode1 = {

    tag: 'div',
    props: {
        id: 'hello'
    },
    children: [
        {tag: 'p', children: 'hi p'},
        {tag: 'ul', children: [{tag: 'li'}, {tag: 'li'}]}
    ]

}

const {render} = createRenderer(observerOption);

render(vnode1, document.body);







