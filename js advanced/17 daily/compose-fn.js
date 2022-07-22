function one(number) {
    return number + ' 1';
}

function two(number) {
    return number + ' 2';
}

function three(number) {
    return number + ' 3';
}

function compoose(...fns) {

    return fns.reduce((pre, cur) => {

        return function (...args) {
            return cur(pre(...args));
        }

    });

}


let fn = compoose(one, two, three);
console.log(fn(0));
console.log(three(two(one(0))));

console.log(this === module.exports);
console.log('------------------')


function compoose2(...fns){

    return function (...args){
        let result;
        for (let i=0;i<fns.length;i++){

           if(i===0) result =  fns[i](...args);
           else  result =  fns[i](result);

        }

        return result;
    }


}
const fn1 = compoose2(one, two, three);
console.log(fn1(0));
