import {reactive} from "../reactivity/index.js";
import {observerOption} from "./options.js";
import {createRenderer} from "./index.js";

// const vnode1 = {
//
//     tag: 'div',
//     props: {
//         id: 'hello'
//     },
//     children: [
//         {tag: 'p', children: 'hi p'},
//         {tag: 'ul', children: [{tag: 'li'}, {tag: 'li'}]}
//     ]
//
// }
//
// const {render} = createRenderer(observerOption);
//
// render(vnode1, document.body);

const {render} = createRenderer(observerOption);
const app = document.querySelector('#app')


// const VNode1 = {
//     type: 'div',
//     children: [
//         {type: 'p', children: '1', key: 1},
//         {type: 'p', children: '2', key: 2},
//         {type: 'p', children: '3', key: 3},
//         {type: 'p', children: '4', key: 4}
//     ]
// }
// render(VNode1, app)
//
// const VNode2 = {
//     type: 'div',
//     children: [
//         {type: 'p', children: '4', key: 4},
//         {type: 'p', children: '2', key: 2},
//         {type: 'p', children: '1', key: 1},
//         {type: 'p', children: '3', key: 3}
//     ]
// }
//
// setTimeout(() => {
//     console.log('update')
//     render(VNode2, app)
// }, 2000);


//
// const VNode1 = {
//     type: 'div',
//     children: [
//         { type: 'p', children: '1', key: 1 },
//         { type: 'p', children: '2', key: 2 },
//         { type: 'p', children: '3', key: 3 },
//         { type: 'p', children: '4', key: 4 }
//     ]
// }
// render(VNode1, document.querySelector('#app'))
//
// const VNode2 = {
//     type: 'div',
//     children: [
//         { type: 'p', children: '2', key: 2 },
//         { type: 'p', children: '4', key: 4 },
//         { type: 'p', children: '1', key: 1 },
//         { type: 'p', children: '3', key: 3 }
//     ]
// }
//
// setTimeout(() => {
//     console.log('update')
//     render(VNode2, app)
// }, 2000);


// const VNode1 = {
//     type: 'div',
//     children: [
//         { type: 'p', children: '1', key: 1 },
//         { type: 'p', children: '2', key: 2 },
//         { type: 'p', children: '3', key: 3 }
//     ]
// }
// render(VNode1, document.querySelector('#app'))
//
// const VNode2 = {
//     type: 'div',
//     children: [
//         { type: 'p', children: '4', key: 4 },
//         { type: 'p', children: '1', key: 1 },
//         { type: 'p', children: '2', key: 2 },
//         { type: 'p', children: '3', key: 3 }
//     ]
// }
//
// setTimeout(() => {
//     console.log('update')
//     render(VNode2, app)
// }, 2000);


const VNode1 = {
    type: 'div',
    children: [
        { type: 'p', children: '1', key: 1 },
        { type: 'p', children: '2', key: 2 },
        { type: 'p', children: '3', key: 3 }
    ]
}
render(VNode1, document.querySelector('#app'))

const VNode2 = {
    type: 'div',
    children: [
        { type: 'p', children: '1', key: 1 },
        { type: 'p', children: '3', key: 3 }
    ]
}

setTimeout(() => {
    console.log('update')
    render(VNode2, app)
}, 2000);

//
// function f() {
//     const a=1, b=3;
//
//     b = 2;
//     console.log(b);
// }
//
//
// f()
// console.log(b)


// const MyComp = {
//
//     props: {
//
//         title: String
//     },
//
//     data() {
//         return {name: 'this is name'}
//     },
//     render() {
//
//         return {
//
//             type: 'div',
//             children: this.name + this.title
//
//         }
//
//     }
//
// }
//
// const CompVNode = {
//     type: MyComp,
//     props: {
//         title: 'A Big Title'
//     }
// }
// render(CompVNode, app);
//
//
// setTimeout(() => {
//
//     const CompVNode = {
//         type: MyComp,
//         props: {
//             title: 'A Small Title'
//         }
//     }
//
//     render(CompVNode, app);
//
// }, 2000)





