import link from './components/link';
import view from './components/view';


export default function install(Vue) {

    Vue.mixin({

        beforeCreate() {

            const {router} = this.$options;
            if (router) {

                router.init(this);

                this._router = router;
                this._root = this;

                Vue.util.deactivate(this, '_route', router.currentRoute)

            } else {

                const parent = this.$parent;

                if (parent) this._root = parent._root;
            }


        }


    })


    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._root._router;

        }
    })


    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._root._route;
        }
    })

    Vue.component('router-link', link);
    Vue.component('router-view', view);


}