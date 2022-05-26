import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directives from "./directives";

Vue.config.productionTip = false;

for (let prop in directives) {
    if (directives.hasOwnProperty(prop)) {
        Vue.directive(prop,directives[prop])
    }
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
