Function.prototype._apply = function (context, args) {

    if (typeof context !== 'object') context = new Object(context);
    context._fn = this;
    context._fn(...args);
    delete context._fn;
};

Function.prototype._call = function (context, ...args) {
    if (typeof context !== 'object') context = new Object(context);
    context.fn = this;
    context._fn(...args);
    delete context._fn;
};


Function.prototype._bind = function (context, ...args) {

    if (typeof context !== 'object') context = new Object(context);

    context._fn = this;

    return function (...others) {

        return context._fn(...args, ...others);
    }

};

Function.prototype.$call = function (thisArg, ...args) {

    if (thisArg === null || thisArg === undefined) thisArg = window;
    else thisArg = Object(thisArg);
    thisArg.fn = this;
    const result = thisArg.fn(...args);
    delete thisArg.fn;
    return result;

}


Function.prototype.$apply =  function (thisArg,args = []){

    if (thisArg === null || thisArg === undefined) thisArg = window;
    else if(!Array.isArray(args)) throw new Error('must a like array');
    thisArg.fn =  this;
    const result =  thisArg.fn(...args);
    delete thisArg.fn;
    return result;

}

Function.prototype.$bind =  function (thisArg,...args){

    if (thisArg === null || thisArg === undefined) thisArg = window;

    thisArg.fn =  this;

    return function (...otherArgs){

        const  result = thisArg.fn(...args,...otherArgs);

        // 不需要 delete ,因为后面可能还需要调用

        // delete thisArg.fn;

        return result;
    }





}


