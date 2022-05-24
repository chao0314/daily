import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import '../public/pc/css/main.css';

//注册 百度地图
import 'echarts/extension/bmap/bmap';

//注册 词云
import 'echarts-wordcloud';

//按需加载
import ECharts from 'vue-echarts'

import {use} from "echarts/core";

import {CanvasRenderer} from 'echarts/renderers';
import {BarChart} from 'echarts/charts'
import {GridComponent, TooltipComponent, LegendComponent} from 'echarts/components'

use([
    CanvasRenderer,
    BarChart,
    GridComponent,
    TooltipComponent,
    LegendComponent
]);


const app = createApp(App);
app.component('v-chart', ECharts);
app.use(router).mount('#app');

