const handler = (name) => ({

    set(target, p, value, receiver) {

        console.log(name, target, p, value, receiver);

        return Reflect.set(target, p, value, receiver);
    }

})

const parent = new Proxy({
    name: 'parent'
}, handler('parent'))

const child = new Proxy({}, handler('child'));

Object.setPrototypeOf(child, parent);

// console.log(child.__proto__ === parent);

child.name = 'hello set';



console.log(parent.name)