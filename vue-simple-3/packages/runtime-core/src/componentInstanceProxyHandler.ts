import {hasOwnProp} from "@vue/shared";

export default {

    get({_: instance}, prop) {

        const {setupState, props, data} = instance;

        if (prop[0] === '$') return;
        let target;
        if (hasOwnProp(setupState, prop)) target = setupState;
        if (hasOwnProp(props, prop)) target = props;
        if (hasOwnProp(data, prop)) target = data;
        return Reflect.get(target, prop);
    },
    set({_: instance}, prop, value) {
        const {setupState, props, data} = instance;
        let target;
        if (hasOwnProp(setupState, prop)) target = setupState;
        if (hasOwnProp(props, prop)) target = props;
        if (hasOwnProp(data, prop)) target = data;
        return Reflect.set(target, prop, value);
    }
}