export * from './shapeFlags';
export const isObj = target => target !== null && typeof target === "object";
export const hasOwnProp = (target, prop) => Object.prototype.hasOwnProperty.call(target, prop);
export const isIntegerKey = key => /^\d+$/.test(key);
export const isArray = target => Array.isArray(target);
export const isString = target => typeof target === 'string';
export const isFn = target => typeof target === 'function';
export const isOn = target => /^on[^a-z]/.test(target);
export const isNo = target => target === null || target === void 0;
export const isVNode = target => target._is_VNode;
//# sourceMappingURL=index.js.map