import Store from "@/m-vuex/Store";

export default {

    install(Vue) {

        Vue.mixin({

            beforeCreate() {
                const store = this.$options.store;
                const parent = this.$parent;
                if (!parent && store) this.$store = store;
                if (parent && parent.$store) this.$store = parent.$store;
            }

        })

    },
    Store
}