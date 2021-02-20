export function isFn(value) {

    return value && value instanceof Function;

}

export function isObj(value) {

    return value && typeof value === 'object' && !Array.isArray(value);
}

export function isHtmlTag(tagName) {
// - 连接的为组件 component  严格应采用标签字典
    return tagName.toLowerCase().indexOf('-') < 0;

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
    if (otherHook) {
        if (Array.isArray(targetHook)) mergedHook = targetHook.concat(otherHook);
        else {
            if (targetHook) mergedHook = mergedHook.concat(targetHook, otherHook);
            else mergedHook = mergedHook.concat(otherHook);
        }
    } else if (targetHook) mergedHook = mergedHook.concat(targetHook);

    return mergedHook;

}

lifecycleHooks.forEach(hookName => strategy[hookName] = mergeHook);

strategy.components = function (parentComponentsField, childComponentsField) {

    // components.__proto__ = childComponentsFields
    //等于
    // const  components = {};
    // Object.setPrototypeOf(components,parentComponentsField);
    //最终形成局部组件内 components 属性内找不到注册的组件，就去全局内找
    const components = Object.create(parentComponentsField);
    childComponentsField && Object.entries(childComponentsField).forEach(([key, value]) => components[key] = value);
    return components;
}


export function mergeOptions(optionsA = {}, optionsB = {}) {

    let options = {};
    let keySet = new Set(Object.keys(optionsA).concat(Object.keys(optionsB)));

    keySet.forEach(key => {

        let valueA = optionsA[key];
        let valueB = optionsB[key];

        if (isObj(valueB) && isObj(valueA)) options[key] = {...valueA, ...valueB};
        else if (strategy[key]) options[key] = strategy[key](valueA, valueB);
        else options[key] = valueB || valueA;


    })

    return options;

}
