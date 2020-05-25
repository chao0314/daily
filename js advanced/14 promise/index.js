class iPromise {

    constructor(executor) {
        this.status = 'pending';
        this.aSuccessCallback = [];
        this.aFailedCallback = [];
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (e) {
            this.reject(e);
        }

    }

    resolve(result) {

        setTimeout(() => {
            if (this.status === 'pending') {
                // console.log('resolve', result, this.status);
                this.status = 'resolve';
                this.aSuccessCallback.forEach(callback => callback(result));
            }

        }, 0)

    }

    reject(error) {

        setTimeout(() => {
            if (this.status === 'pending') {
                //console.log('reject', error, this.status);
                this.status = 'reject';
                this.aFailedCallback.forEach(callback => callback(error));
            }

        }, 0)


    }

    then(success, failed) {
        // console.log('then', this.status);
        if (this.status !== 'pending') return;
        if (success instanceof Function) this.aSuccessCallback.push(success);
        if (!(failed instanceof Function)) {
            failed = (err) => {
                if (!err instanceof Error) err = new Error(err);
                throw err;
            };
        }

        this.aFailedCallback.push(failed);



        return new iPromise((resolve, reject) => {

            this.aSuccessCallback = this.aSuccessCallback.map(callback => result => {

                try {
                    let value = callback(result);
                    if (value instanceof iPromise) {
                        value.then((res) => resolve(res), (e) => reject(e));
                    } else {
                        resolve(value);
                    }

                } catch (e) {
                    reject(e);
                }

            });

            this.aFailedCallback = this.aFailedCallback.map(callback => err => {

                try {
                    let value = callback(err);
                    if (value instanceof iPromise) {
                        value.then((res) => resolve(res), (e) => reject(e))
                    } else {
                        resolve(value);
                    }
                } catch (e) {
                    reject(e)

                }

            })

        });

    }

    catch(failed) {
        if (this.status !== 'pending') return;
        this.then(null, failed);
    }

    static all(aiPromise) {
        return new iPromise((resolve, reject) => {
            let aResult = [];
            let index = 0;
            let sum = aiPromise.length;
            for (let i = 0; i < sum; i++) {
                aiPromise[i].then((result) => {
                    index++;
                    aResult[i] = result;
                    if (index === sum) resolve(aResult);
                }, (e) => {
                    reject(e);
                })

            }
        })

    }
}

exports = module.exports = iPromise;