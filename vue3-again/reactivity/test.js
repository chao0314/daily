import {track, trigger, effect, reactive, addJob, flushJob, computed, watch} from "./index.js";


const obj = {name: 'hello', age: 18};
const pObj = reactive(obj)

// effect(() => {
//
//     console.log(pObj.name)
//
//     effect(() => {
//
//         console.log(pObj.age);
//     })
// })


// const fn2 = effect(() => {
//
//     console.log(pObj.age);
// })
//
//
// const fn1 = effect(() => {
//
//     console.log(pObj.name)
//     fn2();
//
// })
//
// fn1();


// effect(() => {
//
//     console.log(pObj.age);
// }, {
//     scheduler: (fn) => {
//         console.log('this is scheduler');
//         fn()
//     }
// })


// effect(() => {
//
//     console.log(pObj.age);
// }, {
//     scheduler: (fn) => {
//
//         addJob(fn);
//         flushJob();
//     }
// })

// setTimeout(() => {
//     pObj.name = 'change';
//
// }, 1000);


// setTimeout(() => {
//     pObj.age = 20;
//     pObj.age = 21;
//     pObj.age = 22;
//
// }, 2000);


//computed

// effect(()=>{
//
//     const age = computed(()=>pObj.name+'---'+pObj.age);
//
//     console.log(age.value)
// })
//
//
// setTimeout(()=>{
//     pObj.age =  20;
// },2000)
//
// setTimeout(()=>{
//     pObj.name =  'hi';
// },4000)


//watch

// watch(() => pObj.name, (oldV, newV) => {
//
//     console.log('watch name', oldV, newV);
//
// })
//
//
// setTimeout(() => pObj.name = 'hi watch', 2000);


// watch(() => pObj.name, (oldV, newV) => {
//
//     console.log('watch name', oldV, newV);
//
// }, {immediate: true})
//
//
// setTimeout(() => pObj.name = 'hi', 2000);


const parent = {pName: 'parent'};

const pParent = reactive(parent);

Object.setPrototypeOf(pObj, pParent);

effect(() => {

    console.log(pObj.pName)

})


setTimeout(() => {

    pObj.pName= 'hi change'

}, 2000)

