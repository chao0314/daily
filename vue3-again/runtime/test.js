import {reactive, ref} from "../reactivity/index.js";
import {observerOption} from "./options.js";
import {createRenderer} from "./index.js";
import {defineAsyncComponent} from "./component/defineAsyncComponent.js";
import {KeepAlive} from "./component/keepAlive.js";
import {Teleport} from "./component/Teleport.js";
import {Transition} from "./component/Transition.js";

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
//         { type: 'p', children: '1', key: 1 },
//         { type: 'p', children: '3', key: 3 }
//     ]
// }
//
// setTimeout(() => {
//     console.log('update')
//     render(VNode2, app)
// }, 2000);

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

//-----------------------component----------------------------------

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
//
//     setup(props, {emit}) {
//
//         const msgRef = ref(' this is ref msg');
//
//         setTimeout(() => {
//
//             msgRef.value = ' hello change ref';
//
//             emit('change');
//         }, 4000)
//
//         return {
//
//             msgRef
//         }
//
//     },
//     render() {
//
//         return {
//
//             type: 'div',
//
//             children: this.name + this.title + this.msgRef.value
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
//         title: ' Big Title',
//         onChange() {
//             console.log('this is a  change handler');
//         }
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
//             title: ' Small Title',
//             onChange() {
//                 console.log('this is a  change handler');
//             }
//         }
//     }
//
//     render(CompVNode, app);
//
// }, 2000)


//-------------------component slot------------------------


/**
 <div>
 <p><slot mame="header"></slot></p>
 <p><slot mame="body"></slot></p>
 <p><slot mame="footer"></slot></p>
 </div>
 * */

//定义组件
// const MyComp = {
//
//     props: {},
//     data() {
//         return {}
//     },
//     setup() {
//         return {}
//     },
//     render() {
//
//         return {
//             type: 'div',
//             children: [{
//                 type: 'p',
//                 children: [this.$slots.header()]
//             }, {
//                 type: 'p',
//                 children: [this.$slots.body()]
//             }, {
//                 type: 'p',
//                 children: [this.$slots.footer()]
//             }]
//         }
//
//     }
// }

/**
 <my-comp>
 <template #header><span>this is header</span></template>
 <template #body><span>this is body</span></template>
 <template #footer><span>this is footer</span></template>
 </my-comp>
 **/
//模板编译后的 虚拟 vnode
// const CompVNode = {
//     type: MyComp,
//     props: {},
//     children: {
//         header() {
//             return {
//                 type: 'span',
//                 children: 'this is header'
//             }
//         },
//         body() {
//             return {
//                 type: 'span',
//                 children: 'this is body'
//             }
//         },
//         footer() {
//
//             return {
//                 type: 'span',
//                 children: 'this is footer'
//
//             }
//
//         }
//     }
//
// }
// render(CompVNode, app);

//-----------------------------defineAsyncComponent-----------------------------------------------------

//
// let counter = 0
// const AsyncComponent = {
//     name: 'AsyncComponent',
//     props: {
//         title: String
//     },
//     setup(props, {emit, slots}) {
//
//         return () => {
//             return {
//                 type: 'div',
//                 children: [
//                     {
//                         type: defineAsyncComponent({
//                             loader: () => new Promise((r, j) => {
//                                 setTimeout(() => {
//                                     counter > 2 ? r(InnerComp) : j('error...')
//                                 }, 2000)
//                             }),
//                             timeout: 0,
//                             errorComponent: {
//                                 setup() {
//                                     return () => {
//                                         return {type: 'h2', children: 'Error - timeout'}
//                                     }
//                                 }
//                             },
//                             delay: 500,
//                             loadingComponent: {
//                                 setup() {
//                                     return () => {
//                                         return {type: 'h2', children: 'Loading...'}
//                                     }
//                                 }
//                             },
//                             onError(retry, fail, count) {
//                                 console.log(count);
//                                 counter = count;
//                                 if (count <= 3) retry();
//                                 else fail();
//                             }
//                         })
//                     }
//                 ]
//             }
//         }
//     }
// }
//
// const InnerComp = {
//     name: 'InnerComp',
//     setup() {
//         return () => ({
//             type: 'span',
//             children: 'inner'
//         })
//     }
// }
//
//
// //模板编译后的 虚拟 vnode
// const CompVNode = {
//     type: AsyncComponent,
//     props: {}
//
// }
// render(CompVNode, app);

//-------------------keepAlive-----------------------------


// const MyComponent = {
//     name: 'MyComponent',
//     props: {
//         title: String
//     },
//     setup(props, {emit, slots}) {
//
//         const counter = ref(0)
//
//         return () => {
//             return {
//                 type: 'button',
//                 props: {
//                     onClick() {
//                         counter.value++
//                     }
//                 },
//                 children: `count is ${counter.value}`
//             }
//         }
//     }
// }
//
// const MyComponent1 = {
//     name: 'MyComponent1',
//     props: {
//         title: String
//     },
//     setup(props, {emit, slots}) {
//
//         return () => {
//             return {
//                 type: 'button',
//                 props: {},
//                 children: `other button`
//             }
//         }
//     }
// }
//
// const CompVNode = {
//     type: KeepAlive,
//     props: {},
//     children: {
//         default() {
//             return {type: MyComponent, props: {}}
//         }
//     }
// }
//
//
// const CompVNode1 = {
//     type: KeepAlive,
//     props: {},
//     children: {
//         default() {
//             return {type: MyComponent1, props: {}}
//         }
//     }
// }
//
// render(CompVNode, app)
//
// // setTimeout(() => {
// //     render(null, app)
// // }, 2000);
//
// setTimeout(() => {
//     render(CompVNode1, app)
// }, 2000);
//
// setTimeout(() => {
//     render(CompVNode, app)
// }, 4000);


//-----------------------------------Teleport-------------------------------
//
// const compVNode = {
//
//     type: Teleport,
//     props: {to: "body"},
//     children: {
//         default() {
//             return {type: 'div', children: 'this is a teleport that appended to body element'};
//         }
//     }
//
// }
//
// render(compVNode, app);
//
// const compVNode1 = {
//
//     type: Teleport,
//     props: {to: "#app"},
//     children: {
//         default() {
//             return {type: 'div', children: 'other'};
//         }
//     }
//
// }
//
// setTimeout(() => {
//     render(compVNode1, app);
// }, 2000)

//----------------------------------transition---------------------------------------

const App = {
    name: 'App',
    setup() {
        const toggle = ref(true)

        setTimeout(() => {
            toggle.value = false
        }, 2000);

        return () => {
            return {
                type: Transition,
                children: {
                    default() {
                        return toggle.value ? {type: 'div', props: {class: 'box'}, children: ''} : {
                            type: 'p',
                            children: ''
                        }
                    }
                }
            }
        }
    }
}
render({type: App}, app);