// const handler = (name) => ({
//
//     set(target, p, value, receiver) {
//
//         console.log(name, target, p, value, receiver);
//
//         return Reflect.set(target, p, value, receiver);
//     }
//
// })
//
// const parent = new Proxy({
//     name: 'parent'
// }, handler('parent'))
//
// const child = new Proxy({}, handler('child'));
//
// Object.setPrototypeOf(child, parent);
//
// // console.log(child.__proto__ === parent);
//
// child.name = 'hello set';
//
//
//
// console.log(parent.name)

const loader = () => {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            Math.random() > 0.5 ? resolve('success') : reject('error');
        }, 1000)


    })


}


const onError = (retry, fail, count) => {

    console.log(count);
    if (count < 3) retry();
    else fail();
}


let count = 0;

const load = async () => {

    try {

        return await loader();

    } catch (e) {

        if (onError) {

            return new Promise((resolve, reject) => {

                const retry = () => resolve(load());
                const fail = () => reject(e);

                onError(retry, fail, ++count);


            })


        } else {

            throw e;

        }


    }

}


load().then(value => {
    console.log('value--', value)
}, error => console.log('error--', error));