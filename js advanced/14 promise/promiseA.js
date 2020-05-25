class PromiseA {
    constructor(exector) {
        this._status = 'pending';
        this._fulfailled = [];
        this._rejected = [];
        try {
            exector instanceof Function && exector(this._resolve.bind(this), this._reject.bind(this));
        } catch (e) {
            this._reject(e)
        }

    }

    then(onFulfilled, onRejected) {
        if (onFulfilled instanceof Function) this._fulfailled.push(onFulfilled);
        if (onRejected instanceof Function) this._rejected.push(onRejected);

        return PromiseA._promiseResolution(this, new PromiseA());

    }

    static _promiseResolution(promise, promise2) {

        function handler(callback) {

            return value => {
                try {
                    let result = callback(value);
                    if (result instanceof PromiseA) {

                        if (result === promise2) promise2._reject(new TypeError("same promise"));
                        else {
                            result.then(value => promise2._resolve(value), reason => promise2._reject(reason));
                        }
                    } else {

                        promise2._resolve(result);
                    }

                } catch (e) {
                    promise2._reject(e);

                }
            }
        }


        promise._fulfailled = promise._fulfailled.map(callback => handler(callback));

        promise._rejected = promise._rejected.map(callback => handler(callback));

        return promise2;
    }


    _resolve(value) {
        setTimeout(() => {

            if (this._status === 'pending') {

                if (value instanceof PromiseA) {
                    if (value === this) this._reject(new TypeError('same promise'));
                    else {
                        value.then(value => this._resolve(value), reason => this._reject(reason));
                    }
                } else {
                    this._status = 'resolved';
                    try {
                        this._fulfailled.forEach(callback => callback(value));
                    } catch (e) {
                        this._reject(e);
                    }
                }
            }

        }, 0)

    }

    _reject(reason) {

        setTimeout(() => {
            if (this._status === 'pending') {
                this._status = 'rejected';
                if (this._rejected.length === 0) throw reason;
                else this._rejected.forEach(callbak => callbak(reason));
            }
        }, 0)


    }

    catch(callback) {

        return this.then(null, callback);


    }

    static all(aPromise) {
        return new PromiseA((resolve, reject) => {
            let result = [];
            let index = 0;
            let total = aPromise.length;
            for (let i = 0; i < aPromise.length; i++) {
                aPromise[i].then(data => {
                    result[i] = data;
                    if (++index === total) resolve(result);
                }, reason => reject(reason))

            }

        })
    }


    static race(aPromise) {

        return new PromiseA((resolve, reject) => {

            for (let i = 0; i < aPromise.length; i++) {
                aPromise[i].then(data => resolve(data), reason => reject(reason));
            }

        })


    }

    finally(callback) {
        return this.then(callback, callback);

    }
}

exports = module.exports = PromiseA;