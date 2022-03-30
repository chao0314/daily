import {createApp} from 'vue';
import App from './App.vue';


//按需加载
import VChart from 'vue-echarts'


import {use} from "echarts/core";
import {CanvasRenderer} from 'echarts/renderers';
import {LineChart, BarChart, CustomChart, PieChart} from 'echarts/charts';
import {GridComponent, TooltipComponent, LegendComponent, TitleComponent} from 'echarts/components';

//注册 百度地图
import 'echarts/extension/bmap/bmap';

use([
    CanvasRenderer,
    LineChart,
    BarChart,
    CustomChart,
    PieChart,
    GridComponent,
    TooltipComponent,
    LegendComponent,
    TitleComponent
]);


const app = createApp(App);

app.component('v-chart', VChart);

app.mount('#app');

