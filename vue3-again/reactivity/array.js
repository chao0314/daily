export const ArrayMethodMutations = {}


    //数组查找相关的方法，由于 proxy,会导致查找时 this的不同，不仅要在代理的数组上找，还要在原数组上找
    // 因为 method(obj)  ,obj有可能是代理的对象，也有可能是原生未代理对象
    ['includes', 'indexOf', 'lastIndexOf'].forEach(name => {

    ArrayMethodMutations[name] = (...args) => {

        const originMethod = Array[name];

        const res = originMethod.apply(this, args);
        if (res === true || res > -1) return res;
        return originMethod.apply(this._raw, args);


    }


})


function aboutModify(...args) {


}