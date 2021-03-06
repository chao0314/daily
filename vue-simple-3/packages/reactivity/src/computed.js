import { isFn, isObj } from "@vue/shared";
import { effect, track, trigger } from "./effects";
import { TrackOperators, TriggerOperators } from "./operators";
class ComputedRefImp {
    constructor(setter, getter) {
        this.setter = setter;
        this.getter = getter;
        this.dirty = true;
        this._v_isRef = true;
        this.effect = effect(getter, {
            lazy: true, scheduler: () => {
                this.dirty = true;
                // 通知 依赖此 computed 的 effect 重新执行 （取值）
                trigger(this, TriggerOperators.SET, 'value');
            }
        });
    }
    get value() {
        //cache
        if (this.dirty) {
            this.dirty = false;
            // 此时 computed的 effect 会被  getter 里的依赖收集
            this._value = this.effect();
        }
        // 让computed属性 收集此时的 active effect（使用此computed属性的模板 effect或嵌套的父级effect）
        track(this, TrackOperators.GET, 'value');
        return this._value;
    }
    set value(newValue) {
        this.setter(newValue);
    }
}
export function computed(options) {
    let setter;
    let getter;
    if (isFn(options)) {
        setter = () => console.error('computed can not be set');
        getter = options;
    }
    else if (isObj(options)) {
        const { set, get } = options;
        setter = set;
        getter = get;
    }
    return new ComputedRefImp(setter, getter);
}
//# sourceMappingURL=computed.js.map