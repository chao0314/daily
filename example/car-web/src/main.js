import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../public/css/zerogrid.css';
import '../public/css/style.css';
import '../public/css/responsiveslides.css';
import '../public/css/bootstrap.css';
import alert from "./plugin/alert";


Vue.use(alert);
Vue.config.productionTip = false
Vue.filter('banner', value => {

    return `http://localhost:8088/image/banner/${value}`;
})
Vue.filter('car', value => {

    return `http://localhost:8088/image/car/${value}`;
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
