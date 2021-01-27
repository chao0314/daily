/*
* _c('div', {id: 'app', style: {color: 'red'}}, _t('hello'), _c('span', {}, _t('world')));
*
* _c(tagName,props,...children) 创建元素 ,props 包括但不限于 attrs
*
* _t(text) 创建文本节点 text:hello {{name}} world => "hello" + name + "world"
*
* _s(obj)  用于文档输出对象信息， let obj = {name:"hello"} , tpl 直接输出{{obj}} 为 [object object], need JSON.stringify()
*
* 用于在模板编译的 render 函数中 with(this) 时运行
* */

import {createVElement, createVText} from "./vnode/index" ;


export default function initRenderMixin(Vue) {

    Vue.prototype._c = function (tagName, data, ...children) {

        return createVElement(this, tagName, data, ...children);

    }

    Vue.prototype._t = function (text) {

        return createVText(this, text);
    }

    Vue.prototype._s = function (value) {

        return typeof value === 'object' ? JSON.stringify(value) : value;
    }


}