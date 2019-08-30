import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.filter('imgpath', val => `http://api.zhinengshe.com/10001-you163/${val}?apikey=299f648e53754c579bb5d142cbcbb115`);

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
