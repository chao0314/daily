import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

Vue.filter("imgPath",function (value:string) {
  return `http://api.zhinengshe.com/10003-taobao-simple/${value}?apikey=299f648e53754c579bb5d142cbcbb115`;
});
