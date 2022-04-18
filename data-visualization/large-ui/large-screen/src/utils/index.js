const refMap = new Map();
let timer = null;
export const registerMock = (refs, start = 0, end = 10) => {

    if (!Array.isArray(refs)) refs = [refs];
    refs.forEach(ref => {
        refMap.set(new WeakRef(ref), [start, end]);
    })

}

export const startMock = (interval = 3000) => {

    if (timer) clear(timer);
    timer = setInterval(() => {

        for (const [key, range] of refMap.entries()) {

            const ref = key.deref();
            if (ref) {
                const [start, end] = range;

                const value = Number(ref.value);
                ref.value = value + (Math.round(Math.random() * (end - start)) + start);
            } else refMap.delete(key);

        }


    }, interval)

}


export const cancelMock = () => clearInterval(timer);