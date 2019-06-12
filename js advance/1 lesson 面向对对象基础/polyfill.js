function assert(reg, msg) {
    if (!reg) throw new Error(msg);
}

String.prototype.trim = String.prototype.trim || function () {
    console.log("trim polyfill");
    return this.replace(/^\s+|\s$/g, "");
};

Array.prototype.filter = Array.prototype.filter || function (cb) {
    console.log("filter polyfill");
    assert(cb instanceof Function, "callback type error");
    var result = [];
    var len = this.length;
    var index = 0;
    while (len > index) {
        var value = this[index];
        if (cb(value, index++, this)) result.push(value);
    }
    return result;
};

Array.prototype.reduce = Array.prototype.reduce || function (cb, init) {
    console.log("reduce polyfill");
    assert(cb instanceof Function, "callback type error");
    var accumulator;
    var len = this.length;
    var index = 0;
    if (init) {
        accumulator = init;
    } else {
        accumulator = this[index++];
    }
    while (len > index) {
        accumulator = cb(accumulator, this[index], index++, this);
    }

    return accumulator;
};

Array.from = Array.from || function (arrayLike, cb) {
    console.log("from polyfill");
    assert(arrayLike.length, "arrayLike need length property");
    var len = Math.min(Number.MAX_SAFE_INTEGER, arrayLike.length);
    var index = 0;
    var result = [];
    // while (len > 0 && len > index) {
    //     var item = arrayLike[index] || arrayLike[Number(index).toString()];
    //     if (cb && cb instanceof Function) item = cb(item);
    //     result.push(item);
    //     index++;
    // }
    if (cb && cb instanceof Function) {
        while (len > index) {
            var item = arrayLike[index++] || arrayLike[Number(index++).toString()];
            item = cb(item);
            result.push(item);
        }
    } else {
        while (len > index) {
            result.push(arrayLike[index++] || arrayLike[Number(index++).toString()]);
        }
    }

    return result;

};
