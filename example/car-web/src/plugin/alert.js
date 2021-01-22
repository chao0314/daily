import options from "../components/common/Message";

export default {

    install(Vue) {

        let Message = Vue.extend(options);
        let instance = new Message().$mount();
        document.querySelector('body').appendChild(instance.$el);
        Vue.prototype.$alert = function (message = '', confirm, cancel) {
            instance.$data.display = true;
            instance.$data.message = message;
            instance.$once('cancel', function () {
                cancel && cancel()
                this.$off('confirm')

            })
            instance.$once('confirm', function () {

                confirm && confirm();
                this.$off('cancel');
            })

        }
    }
}