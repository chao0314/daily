// @ts-ignore
import {createApp} from "vue";
// @ts-ignore
import WUI from 'w-ui';
import App from './App.vue';
import "theme-chalk/src/index.scss";

createApp(App).use(WUI).mount("#app");

// type PropConstructor<T = any> = {
//     new(...args: any[]): T & {};
// }
// type PropType<T> = PropConstructor<T>
//
// type Book = {
//     title:string,
//     price:number
// }
//
// type Yo=  '123'|'321'
//
// type B = PropType<Book>
// type Y = PropType<Yo>
//
// function fn(t:Y ){
//
//    let s =  new t()
// //     s
//
// }




