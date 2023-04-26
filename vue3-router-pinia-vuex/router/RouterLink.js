import {inject} from "vue";

export default {

    name: 'RouterLink',
    props: {
        to: String
    },
    setup(props) {

        const router = inject('app_router');

        return () => h('a', {

            onclick() {

                router.push(props.to);

            }

        })

    }


}