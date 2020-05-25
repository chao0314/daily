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