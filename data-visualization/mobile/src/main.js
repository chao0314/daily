import '../public/css/reset.css';
// import '../utils/rem';
import {createApp} from 'vue'
import App from './App.vue'
import ECharts from 'vue-echarts'
import {use} from "echarts/core";
import {CanvasRenderer} from 'echarts/renderers';
import {LineChart, BarChart, PieChart,RadarChart,SunburstChart} from 'echarts/charts';
import {GridComponent, TooltipComponent, LegendComponent, TitleComponent} from 'echarts/components';

use([
    CanvasRenderer,
    PieChart, LineChart, BarChart,RadarChart,SunburstChart,
    GridComponent,
    TitleComponent,
    TooltipComponent,
    LegendComponent
]);
const app = createApp(App);
app.component('v-chart', ECharts);

app.mount('#app')
