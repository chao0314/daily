import {createApp} from 'vue'
import App from './App.vue'
import {startMock} from "@/utils";
import largeUI from '../../large-ui-libs/dist/large-ui.es';
import '../public/font/icon-svg';
//按需加载
// import {Test} from  '../../large-ui-libs/dist/large-ui.es';
import ECharts from 'vue-echarts'
import {use} from "echarts/core";
import {CanvasRenderer} from 'echarts/renderers';
import {LineChart, BarChart, PieChart} from 'echarts/charts';
import {GridComponent, TooltipComponent, LegendComponent, TitleComponent} from 'echarts/components';

use([
    CanvasRenderer,
    PieChart, LineChart, BarChart,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);
const app = createApp(App);
app.component('v-chart', ECharts);
app.use(largeUI);
// app.use(Test);
app.mount('#app');

startMock();
