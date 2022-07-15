const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class IPromise {

    constructor(executor) {

        if (!(executor instanceof Function)) throw new Error('need function');
        this.fulfilledCbs = [];
        this.rejectedCbs = [];
        this.value = void 0;
        this.reason = void 0;
        this.status = PENDING;
        const resolve = value => {

            if (this.status === PENDING) {

                queueMicrotask(() => {

                    if (this.status === PENDING) {

                        this.status = FULFILLED;
                        this.value = value;
                        this.fulfilledCbs.forEach(cb => cb(this.value));
                    }


                })
            }


        };

        const reject = error => {

            if (this.status === PENDING) {
                queueMicrotask(() => {

                    if (this.status === PENDING) {
                        this.status = REJECTED;
                        this.reason = error;
                        this.rejectedCbs.forEach(cb => cb(this.reason));

                    }

                })
            }


        }

        try {

            executor(resolve, reject);

        } catch (e) {

            reject(e);

        }

    }

    then(onFulfilled, onRejected) {

        onFulfilled = onFulfilled ?? (value => value);

        //兼容 catch,没有捕获 继续抛出
        onRejected = onRejected ?? (error => {
            throw error
        });

        return new IPromise((resolve, reject) => {

            if (this.status === FULFILLED) {

                try {
                    resolve(onFulfilled(this.value));
                } catch (e) {
                    reject(e);
                }

            } else if (this.status === REJECTED) {

                try {
                    // catch 捕获以后 后续 promise 处理时 变为 then，所以此处时 resolve
                    // 如果 onRejected 抛出异常 会在 下面 catch捕获
                    resolve(onRejected(this.reason));

                } catch (e) {
                    reject(e);
                }
            } else {

                this.fulfilledCbs.push(value => {

                    try {
                        resolve(onFulfilled(value));

                        //这里有点欠缺 如果then返回的仍是 promise 那么，后续的状态应该由这个promise来控制
                        // 依次类推 每次返回值都可能时 promise
                        // if(value instanceof  IPromise){
                        //
                        //     value.then(res=> resolve(onFulfilled(value)))
                        // }
                        //


                    } catch (e) {

                        reject(e);
                    }

                });

                this.rejectedCbs.push(reason => {

                    try {
                        resolve(onRejected(reason));
                    } catch (e) {
                        reject(e);

                    }


                });


            }

        })
    }

    catch(onRejected) {

        return this.then(void 0, onRejected);

    }

    finally(onFinally) {

        this.then(onFinally, onFinally);


    }

    static resolve(value) {

        return new IPromise(resolve => resolve(value));

    }

    static reject(reason) {

        return new IPromise((resolve, reject) => reject(reason));
    }

    static all(promises) {

        return new IPromise((resolve, reject) => {

            const results = [];
            let flag = 0;
            for (let i = 0; i < promises.length; i++) {

                const promise = promises[i];

                promise.then(value => {

                    results[i] = value;
                    flag++;
                    if (flag === promises.length) resolve(results);

                }, reason => {

                    reject(reason);

                })
            }
        })
    }

    static allSettled(promises) {

        return new IPromise((resolve, reject) => {

            const len = promises.length;
            const results = [];
            let flag = 0;
            promises.forEach((promise, index) => {

                promise.then(value => {

                    results[index] = {status: FULFILLED, value};
                    flag++;
                    if (flag === len) resolve(results);
                }, reason => {

                    results[index] = {status: REJECTED, reason};
                    flag++;
                    if (flag === len) resolve(results);
                })
            })

        })


    }

    static race(promises) {

        return new IPromise((resolve, reject) => {

            promises.forEach(promise => {

                promise.then(value => resolve(value), reason => reject(reason));

            })


        })


    }

    static any(promises) {

        return new IPromise((resolve,reject)=>{
            const reasons = [];
            let flag = 0;
            const len= promises.length;
            promises.forEach((promise,index)=>{

                promise.then(value=>resolve(value),reason=>{

                    reasons[index] = reason;
                    flag++;
                    if(flag === len) reject(new AggregateError(reasons));
                })


            })

        })



    }

}


const p1 = new IPromise((resolve, reject) => {

    resolve('resolve');

})

p1.then(res => {

    console.log(res);
    return 'then 1 result';
}).then(res => {
    console.log(res)
}).then(res => {

    throw  new Error('this is error');
}).catch(err => {
    console.log('catch', err)
}).finally(res => {
    console.log('this is finally');
})
