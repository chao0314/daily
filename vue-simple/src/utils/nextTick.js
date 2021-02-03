let callback = [];
let pending = false;

function flushCallback() {

    callback.forEach(cb => cb());
    callback = [];
    pending = false

}

export default function nextTick(cb) {
    callback.push(cb);

    if (pending) return;
    pending = true;
    if (Promise) {
        Promise.resolve().then(() => flushCallback());
    } else if (MutationObserver) {

        let observer = new MutationObserver(flushCallback);
        observer.observe(document.createTextNode('text'), {
            characterData: true
        })
    } else if (setImmediate) {

        setImmediate(flushCallback);
    } else {

        setTimeout(flushCallback, 0);
    }


}