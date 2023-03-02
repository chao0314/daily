import {
    track,
    trigger,
    effect,
    reactive,
    addJob,
    flushJob,
    computed,
    watch,
    shallowReactive,
    readonly,
    shallowReadonly
} from "./index.js";




const obj = {name: 'hello', age: 18, data: {money: "many"}};
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

// receiver._raw === target
// const parent = {pName: 'parent'};
//
// const pParent = reactive(parent);
//
// Object.setPrototypeOf(pObj, pParent);
//
// effect(() => {
//
//     console.log(pObj.pName)
//
// })
//
//
// setTimeout(() => {
//
//     pObj.pName= 'hi change'
//
// }, 2000)


// oldValue === newValue

// effect(()=>{
//
//     console.log(pObj.age);
//
// })
//
// setTimeout(()=>{
//     pObj.age = 18
//
// },2000);
//
// setTimeout(()=>{
//     pObj.age = 20
// },4000)


// obj: iterate key

// effect(() => {
//
//     console.log(pObj.age);
//
// })
//
// effect(() => {
//
//     for (const p in pObj) {
//
//         console.log(pObj[p]);
//     }
//
// })

// delete pObj.name;
// pObj.other = 'other'

// setTimeout(() => {
//     pObj.other = 'other';
//
// }, 2000)

// setTimeout(() => {
//     pObj.age = 20;
// }, 2000);


// setTimeout(() => {
//     delete pObj.age;
// }, 4000);


// setTimeout(()=>{
//
//     console.log('pObj',pObj.age);
// },5000)

// const data = {name: 'hello', age: 18, tag: {money: "many"}};
//
//
// // const reactiveObj = reactive(data);
// // const reactiveObj = shallowReactive(data);
// // const reactiveObj = readonly(data);
// const reactiveObj = shallowReadonly(data);
//
// effect(() => {
//
//     console.log(reactiveObj.tag.money);
// })
//
//
// effect(() => {
//
//     console.log(reactiveObj.age);
// })
//
// setTimeout(() => {
//
//     reactiveObj.tag.money = 'much'
//
// }, 2000)
//
// setTimeout(() => {
//
//     reactiveObj.age = 20
//
// }, 3000)


//Array


// const obj1 = {}
// const arr = reactive([obj1])
// const arr1 = reactive([0])

// console.log(arr.includes(arr[0]));
// console.log(arr.includes({}));
// console.log(arr.includes(obj1));
//
//
// effect(()=>{
//     arr1.push(1)
//
// })
//
//
// effect(()=>{
//     console.log(arr1.length)
//
//     for (const v of arr1) {
//
//         console.log('--',v);
//     }
// })
//
//
// setTimeout(()=>{
//
//     arr1.push(2)
//
// },2000)




