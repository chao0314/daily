import {inject, provide, computed, h} from "vue";

export default {
    name: "RouterView",
    setup(props, {slots}) {

        const depth = inject("depth", 0);
        const currentRoute = inject('route');
        const matchedRecordRef = computed(() => currentRoute.matched[depth]);
        provide("depth", depth + 1);

        return () => {
            const record = matchedRecordRef.value;
            //改进后 可以成为 命名多视图路由
            const component = record && record.components.default;

            console.log("router-view", depth, component, slots.default);

            if (component) return h(component);

        }


    }


}


