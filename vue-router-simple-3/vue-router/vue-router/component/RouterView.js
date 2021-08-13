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
            const component = record && record.components.default;

            if (component) return h(component);
            else return h(slots.default && slots.default());


        }


    }


}


