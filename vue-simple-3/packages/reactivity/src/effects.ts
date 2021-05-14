import {isArray, isIntegerKey} from "@vue/shared";
import {TriggerOperators} from "./operators";

let id = 0;
let activeEffect = null;
const effects = [];
const targetMap = new WeakMap();

function createReactiveEffect(fn, options) {

    const effect = function () {
        if (effects.includes(effect)) return;
        try {
            effects.push(effect);
            activeEffect = effect;
            // 执行 fn ,借此 get 收集依赖
            return fn();
        } finally {
            effects.pop();
            activeEffect = effects[effects.length - 1];
        }

    }

    effect.id = id++;
    effect.rawFn = fn;
    effect.isEffect = true;
    effect.rawOptions = options;


    return effect;

}

export function effect(fn, options = {lazy: false, scheduler: null}) {

    const effect = createReactiveEffect(fn, options);
    //lazy effect,delay execute,for example : computed
    if (!options.lazy) effect();
    return effect;
}

export function track(target, operator, prop) {

    // console.log('track', operator, prop);

    if (!activeEffect) return;
    let propsMap = targetMap.get(target);
    if (!propsMap) {
        propsMap = new Map();
        targetMap.set(target, propsMap);
    }
    let propEffectSet = propsMap.get(prop);
    if (!propEffectSet) {
        propEffectSet = new Set();
        propsMap.set(prop, propEffectSet);

    }

    if (!propEffectSet.has(activeEffect)) propEffectSet.add(activeEffect);


}

export function trigger(target, operator, prop, value?) {

    // console.log('trigger', operator, prop, value);
    const propsMap = targetMap.get(target);
    const depEffectSet = new Set();

    if (isArray(target) && prop === 'length') {

        propsMap.forEach((effectSet, prop) => {

            // [1,2,3].length = 1; 情形
            if (prop === 'length' || prop >= value) {

                effectSet.forEach(effect => depEffectSet.add(effect));

            }
        })


    } else {

        propsMap.get(prop).forEach(effect => depEffectSet.add(effect));

        switch (operator) {

            case TriggerOperators.ADD:
                //push
                if (isArray(target) && isIntegerKey(prop)) {
                    //依赖 length 属性的受影响，如 数组完整输出等
                    propsMap.get('length').forEach(effect => depEffectSet.add(effect));
                }

                break;

            default:
                break;

        }


    }

    // interface Options{
    //     rawOptions:{scheduler:Function}
    // }

    depEffectSet.forEach((effect: any) => {
        const {scheduler} = effect.rawOptions;
        if (scheduler) scheduler(effect);
        else effect();

    });


}


