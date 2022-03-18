import {createApp} from 'vue';
import App from './App.vue';

//按需加载
import ECharts from 'vue-echarts'

import {use} from "echarts/core";

import {CanvasRenderer} from 'echarts/renderers';
import {LineChart,BarChart} from 'echarts/charts'
import {GridComponent, TooltipComponent, LegendComponent} from 'echarts/components'

use([
    CanvasRenderer,
    LineChart,
    BarChart,
    GridComponent,
    TooltipComponent,
    LegendComponent
]);


const app = createApp(App);

app.component('v-chart', ECharts);

app.mount('#app')
