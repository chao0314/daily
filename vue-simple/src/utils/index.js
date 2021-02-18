export function isFn(value) {

    return value && value instanceof Function;

}

export function isObj(value) {

    return value && value instanceof Object && !Array.isArray(value);
}

const lifecycleHooks = [
    'beforeCreate',
    'created',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed'
]

const strategy = {}

const mergeHook = function (targetHook, otherHook) {

    let mergedHook = [];
    if (Array.isArray(targetHook)) mergedHook = targetHook.concat(otherHook);
    else {
        if (targetHook) mergedHook = mergedHook.concat(targetHook);
        if (otherHook) mergedHook = mergedHook.concat(otherHook);
    }
    return mergedHook;

}

lifecycleHooks.forEach(hookName => strategy[hookName] = mergeHook);

export function mergeOptions(optionsA = {}, optionsB = {}) {

    let options = {};
    let keySet = new Set(Object.keys(optionsA).concat(Object.keys(optionsB)));

    keySet.forEach(key => {

        let valueA = optionsA[key];
        let valueB = optionsB[key];

        if (isObj(valueB) && isObj(valueA)) options[key] = {...valueA, ...valueB};
        else if (lifecycleHooks.includes(key)) options[key] = strategy[key](valueA, valueB);
        else options[key] = valueB || valueA;


    })

    return options;

}
