import {h, defineComponent, provide, computed} from 'vue';

export default defineComponent({

    name: "WRow",
    props: {
        tag: {
            type: String,
            default: "div"
        },
        gutter: {
            type: Number,
            default: 0
        },
        justify: {
            type: String,
            default: "start"
        }


    },


    setup(props, {slots}) {

        provide('colGutter', props.gutter);

        const style = computed(() => {

            const fix = -props.gutter / 2 + 'px';

            return {
                marginLeft: fix,
                marginRight: fix

            }
        })

        const clazz = computed(() => [
            'w-row',
            `is-justify-${props.justify}`
        ])


        return () => h(props.tag, {
            class: clazz.value,
            style: style.value
        }, slots.default?.())
    }


})