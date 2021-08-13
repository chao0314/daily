import {useRouter} from "../index";
import {h} from 'vue';

export default {
    name: "RouterLink",
    props: {
        to: {
            require: true,
            type: String
        }

    },

    setup(props, {slots}) {

        const router = useRouter();
        return () => h('a', {click: router.push(props.to)}, slots.default && slots.default());

    }
}