const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class IPromise {

    constructor(exector) {

        if (!(exector instanceof Function)) throw new Error('need function');
        this.fulfilledCbs = [];
        this.rejectedCbs = [];
        this.value = void 0;
        this.reason = void 0;
        this.status = PENDING;
        this.resolve = value => {

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

        this.reject = error => {

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

            exector(this.resolve, this.reject);

        } catch (e) {

            this.reject(e);

        }

    }

    then(onFulfilled, onRejected) {

        onFulfilled = onFulfilled ?? (value => value);

        //兼容 catch,没有捕获 继续抛出
        onRejected = onRejected ?? (error => throw error);

        return new IPromise((resolve, reject) => {

            if (this.status === FULFILLED) {

                try {
                    resolve(onFulfilled(this.value));
                } catch (e) {
                    reject(e);
                }

            } else if (this.status === REJECTED) {

                try {
                    reject(onRejected(this.reason));
                } catch (e) {
                    reject(e);
                }
            } else {

                this.fulfilledCbs.push(value => {

                    try {

                        resolve(onFulfilled(value));

                    } catch (e) {

                        reject(e);
                    }

                });

                this.rejectedCbs.push(() => {


                });


            }

        })
    }


}