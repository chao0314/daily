import initOptionsMixin from "./initOptions";
import initRenderMixin from "./initRender";
import initLifeCycleMixin from "./initLifecycle";
import initGlobal from "./initGlobal";

function Vue(options) {

    this._initOptions(options); //initOptionsMixin

}

initOptionsMixin(Vue);

initRenderMixin(Vue);

initLifeCycleMixin(Vue);

initGlobal(Vue);

/*
*
*
*
* dom diff test
*
*
*/


import compileToFunction from './compiler/index.js';
import patchDomTree, {createElement} from './vnode/patch.js'
// diff 核心
let oldTemplate = `<div>
    <li key="A">A</li>
    <li key="B">B</li>
    <li key="C">C</li>
    <li key="D">D</li>
</div>`; // 在最外层创建了一个根节点 vue3可以

let vm1 = new Vue({data: {message: 'hello world'}})
const render1 = compileToFunction(oldTemplate)
const oldVnode = render1.call(vm1); // 虚拟dom

setTimeout(() => document.body.appendChild(createElement(oldVnode)), 1000);

// v-if   v-else
let newTemplate = `<div >
<li key="A">A</li>
<li key="C">C</li>
<li key="B">B</li>
<li key="D">D</li>

</div>`;
let vm2 = new Vue({data: {message: 'dom diff'}});
const render2 = compileToFunction(newTemplate)
const newVnode = render2.call(vm2); // 虚拟dom
// 根据新的虚拟节点更新老的节点，老的能复用尽量复用

document.addEventListener('click', () => {
    setTimeout(() => {
        patchDomTree(oldVnode, newVnode);
    }, 1000);
})


export default Vue;

