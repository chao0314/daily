export function isFn(value) {

    return value && value instanceof Function;

}

export function isObj(value) {

    return value && value instanceof Object && !Array.isArray(value);
}