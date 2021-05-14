import { track, trigger } from "./effects";
import { reactive, readonly } from "./reactive";
import { hasOwnProp, isArray, isIntegerKey } from "@vue/shared";
import { TrackOperators, TriggerOperators } from "./operators";
function createGetter(isReadonly = false, isShallow = false) {
    return function get(target, prop, receiver) {
        let value = Reflect.get(target, prop, receiver);
        if (!isReadonly) {
            track(target, TrackOperators.GET, prop);
        }
        if (!isShallow) {
            value = isReadonly ? readonly(value) : reactive(value);
        }
        return value;
    };
}
function createSetter(isReadonly = false) {
    return function set(target, prop, value, receiver) {
        console.log('set', prop, value);
        if (isReadonly)
            return console.warn('set value to readonly obj,failed!');
        const oldValue = target[prop];
        const existedProp = isArray(target) && isIntegerKey(prop) ? Number(prop) < target.length : hasOwnProp(target, prop);
        const result = Reflect.set(target, prop, value, receiver);
        if (existedProp && oldValue !== value)
            trigger(target, TriggerOperators.SET, prop, value);
        // 数组push修改后,还会改变 length，但在 length 时去获取 target 的oldValue已经为最新值了,所以需要 ADD 加以判断
        if (!existedProp)
            trigger(target, TriggerOperators.ADD, prop, value);
        return result;
    };
}
export const reactiveHandler = {
    get: createGetter(),
    set: createSetter()
};
export const shallowReactiveHandler = {
    get: createGetter(false, true),
    set: createSetter(false)
};
export const readonlyHandler = {
    get: createGetter(true, false),
    set: createSetter(true)
};
export const shallowReadonlyHandler = {
    get: createGetter(true, true),
    set: createSetter(true)
};
//# sourceMappingURL=handlers.js.map