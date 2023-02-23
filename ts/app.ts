function f1(a: number | string, b: number): number | string {

    return a;
}

function f2(a: number): number {

    return a
}

// let fn = f1;
// fn = f2;
//
// let fn2 =  f2;
// fn2 =  f1;

class Person {

    name: string = '1';
}

class Student extends Person {

    age: number = 1;

    constructor() {
        super();
    }
}


let f3 = function (obj: Student): void {

    console.log(obj.age)
}

let f4 = function (obj: Person): void {
    console.log(obj.name)

}


const s = new Student();

// f3(p);
//
// f4(s);

// f3 = f4;
//  f4= f3;

// type o =  {name:string,age:number};
//
// type oo =  Readonly<o>;


// type t<T> = T extends string | number ? T : any;
//
// type t1 = t<string |number | boolean>

// const o = {
//     name: '1',
//     age: 1,
//     is: true
// }
//
// type t=  Omit<typeof o, 'name'|'age'>
//
//
// type t1 =  typeof o;


// const fn = (name:string,age:number):boolean=> {
//
//     return  true
// }
//
//
// type p = Parameters<typeof fn>
//
// type r =  ReturnType<typeof fn>


// type inf<T> = T extends any[]? T[0]:T;
// type inf<T> = T extends any[]? T[number]:T;

// type inf<T> =  T extends Array<infer U> ?U:T
//
//
// type t =  inf<string[]>


// type p  = InstanceType<typeof Person>
// type p1 = typeof Person
// const in1:Person = new Person()
// const in2:p1 = Person


function t<T extends new (...args: any[]) => any>(targrt: T) {

    return class extends targrt {
        constructor(...args: any[]) {
            super(...args);
        }

        say() {
            console.log('hello')
        }
    }
}


@t
class Test {
    name = 'ttt'

    say1() {
    }
}

const i = new Test();

i.say1()


interface One {

    name: string

}

interface Two {
    age: number
}

type TT =  {age:number}

type Three<T> =  One&T ;



const tt:Three<TT> = {
    name:'123',
    age:123

}


type  SN = string |number;


function f<T extends SN>(p:T) {


}

