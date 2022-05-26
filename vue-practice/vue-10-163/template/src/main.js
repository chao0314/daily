import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// import axios from 'axios';
// import VueAxios from 'vue-axios';
// Vue.use(VueAxios, axios);

import axios from '@/axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

Vue.filter('imgpath', val=>`http://api.zhinengshe.com/study/you163/${val}`);


Vue.config.productionTip = false;

let vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

