import { reactive } from "./reactive";
import { track, trigger } from "./effects";
import { TrackOperators, TriggerOperators } from "./operators";
import { isArray, isObj } from "@vue/shared";
class RefImp {
    constructor(value, isShallow = false) {
        this._v_isRef = true;
        this._isShallow = isShallow;
        this._value = isShallow ? value : reactive(value);
    }
    get value() {
        track(this, TrackOperators.GET, 'value');
        return this._value;
    }
    set value(newValue) {
        if (newValue === this._value)
            return;
        this._value = this._isShallow ? newValue : reactive(newValue);
        trigger(this, TriggerOperators.SET, 'value', newValue);
    }
}
class toRefImp {
    constructor(target, prop) {
        this._v_isRef = true;
        this.target = target;
        this.prop = prop;
    }
    get value() {
        return this.target[this.prop];
    }
    set value(newValue) {
        this.target[this.prop] = newValue;
    }
}
export function ref(value) {
    return new RefImp(value);
}
export function shallowRef(value) {
    return new RefImp(value, true);
}
export function toRef(target, prop) {
    return new toRefImp(target, prop);
}
export function toRefs(target) {
    if (!isObj(target))
        return;
    const refs = isArray(target) ? new Array(target.length) : {};
    Object.entries(target).forEach(([prop, value]) => {
        refs[prop] = toRef(target, prop);
    });
    return refs;
}
//# sourceMappingURL=ref.js.map