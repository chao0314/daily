import {trackOptions} from "./index.js";

export const arrayMethodMutations = {};

//数组查找相关的方法，由于 proxy,会导致查找时 this的不同，不仅要在代理的数组上找，还要在原数组上找
// 因为 method(obj)  ,obj有可能是代理的对象，也有可能是原生未代理对象
['includes', 'indexOf', 'lastIndexOf'].forEach(name => {

    arrayMethodMutations[name] = function (...args) {

        const originMethod = Array.prototype[name];
        const res = originMethod.apply(this, args);
        if (res === false || res === -1) return originMethod.apply(this._raw, args);
        return res;


    }


});


['push', 'pop', 'shift', 'unshift', 'splice'].forEach(name => {

    arrayMethodMutations[name] = function (...args) {

        const originMethod = Array.prototype[name];

        trackOptions.shouldTrack = false;

        const res = originMethod.apply(this, args);

        trackOptions.shouldTrack = true;

        return res;

    }


})
