const queue = [];
let pending = false;


export function nextTick(callback) {

    queue.push(callback);

    if (!pending) execute(queue);

}


function execute(queue) {

    pending = true;
    Promise.resolve().then(() => {
        queue.forEach(cb => cb())
        pending = false;
        queue.length = 0;

    })


}