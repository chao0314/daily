import {inject, provide, h} from "vue";

export default {

    name: 'RouterView',

    setup(props) {

        const route = inject('app_route');
        const depth = inject('depth', 0);
        provide('depth', depth + 1);
        return () => {
            //render function 才会响应式渲染
            const {matched} = route.value;

            const component = matched[depth];

            console.log(depth, matched);
            if (component) return h(component);
            throw new Error('no matched component');

        }

    }


}