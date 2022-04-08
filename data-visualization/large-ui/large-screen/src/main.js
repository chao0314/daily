import {createApp} from 'vue'
import App from './App.vue'
import largeUI from '../../large-ui-libs/dist/large-ui.es';
//按需加载
// import {Test} from  '../../large-ui-libs/dist/large-ui.es';
const app = createApp(App);

app.use(largeUI);
// app.use(Test);
app.mount('#app');


// 72.26 2.92 1.4
// 72.26 2.86 1.38