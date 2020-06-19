let queue = [];
let observer = new Promise((resolve, reject) => {

    queue.push((error, data) => {
        if (error) reject(error);
        else resolve(data);
    })


});
queue.push(observer);


observer.then(res => {
    console.log(res)
}).catch(err => {
    console.log(err);
})


setTimeout(() => {
    queue[0](null, 'hello');

}, 1000)


 function fn() {

    let queue = [];
    let observer = new Promise((resolve, reject) => {

        queue.push((error, data) => {
            if (error) reject(error);
            else resolve(data);
        })


    });
    queue.push(observer);




    setTimeout(() => {
        queue[0](null, 'hello2');

    }, 3000)

     return observer;
}

(async function f() {
    console.log('--')
    console.log(await fn())
})()