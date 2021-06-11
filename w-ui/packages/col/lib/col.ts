import {h, defineComponent, computed, inject} from "vue";


export default defineComponent({

    name: "WCol",
    props: {
        tag: {
            type: String,
            default: 'div'
        },
        span: {
            type: Number,
            default: 24,
            validator: (span: number) => span >= 0
        },
        offset: {
            type: Number,
            default: 0,
            validator: (offset: number) => offset >= 0
        },
        xs:{

        },
        sm:{

        },
        md:{},
        lg:{},
        xl:{}


    },
    setup(props, {slots}) {

        const gutter: number = inject("colGutter") ?? 0;
        const clazz = computed(() => {
            const res = [];
            const ps = ['span', 'offset'] as const;
            const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
            ps.forEach(p => {
                res.push(`w-col-${p}-${props[p]}`);
            })

            // 响应式参数
            sizes.forEach(size => {



            })


            return [
                'w-col',
                ...res
            ];

        })

        const style = computed(() => {

            const padding = gutter / 2 + 'px';
            return {
                paddingLeft: padding,
                paddingRight: padding
            }


        })


        return () => h(props.tag, {
            class: clazz.value,
            style: style.value
        }, slots.default?.());
    }

})