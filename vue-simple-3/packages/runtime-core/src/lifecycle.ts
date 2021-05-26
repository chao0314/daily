import {getCurrentInstance, setCurrentInstance} from "./component";
import {isNo} from "@vue/shared";

export const enum Lifecycle {

    BeforeMount = 'beforeMount',
    Mounted = 'mounted',
    BeforeUpdate = 'beforeUpdate',
    Updated = 'updated'


}


function createLifecycleHook(lifecycle) {


    return function (hookFn) {

        const instance = getCurrentInstance();


        if (!isNo(instance)) {


            const hooks = instance[lifecycle] || (instance[lifecycle] = []);


            // 每个 hook 调用的时候 再设置 当初创建时的 instance ，这时为了考虑例如 mounted 这类的hook
            //因为这里的 hook调用时在子组件 完成后才回溯 调用的
            //本质是借助闭包 记录一开始 hook创建时的 组件 instance

            const wrappedHookFn = () => {

                setCurrentInstance(instance);
                hookFn.call(instance);
                setCurrentInstance(null);

            }

            hooks.push(wrappedHookFn)


        } else console.warn('lifecycle hook need instance');


    }


}


export const onBeforeMount = createLifecycleHook(Lifecycle.BeforeMount);


export const onMounted = createLifecycleHook(Lifecycle.Mounted);


export const onBeforeUpdate = createLifecycleHook(Lifecycle.BeforeUpdate);


export const onUpdated = createLifecycleHook(Lifecycle.Updated);






