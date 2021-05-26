export * from './shapeFlags';
export const isObj = target => target !== null && typeof target === "object" && !Array.isArray(target);
export const hasOwnProp = (target, prop) => Object.prototype.hasOwnProperty.call(target, prop);
export const isIntegerKey = key => /^\d+$/.test(key);
export const isArray = target => Array.isArray(target);
export const isString = target => typeof target === 'string';
export const isFn = target => typeof target === 'function';
export const isOn = target => /^on[^a-z]/.test(target);
export const isNo = target => target === null || target === void 0;
export const isVNode = target => target._is_VNode;
export const isSameVNode = (vnode1, vnode2) => vnode1.type === vnode2.type && vnode1.key === vnode2.key
export const invokeArrFns = (fns, args?) => {

    for (let i = 0; i < fns.length; i++) {
        fns[i](args);

    }

}