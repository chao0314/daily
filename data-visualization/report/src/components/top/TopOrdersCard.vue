<template>
  <com-card :title="title" :value="value">
    <template #default>
      <v-chart :option="option" autoresize></v-chart>
    </template>
    <template #footer>
      <p>昨日订单量 <span class="emphasis">{{ yesterdaySales }}</span></p>
    </template>
  </com-card>
</template>

<script>
import ComCard from "@/components/top/ComCard";
import {reportData} from "../../../data/data";

export default {
  name: "TopOrdersCard",
  components: {ComCard},
  setup(props, ctx) {

    const title = '累计订单量';
    const value = '1234,5678';
    const yesterdaySales = '200,000,000';
    const orderTrend = reportData.orderTrend;
    const option = {
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      xAxis: {
        type: 'category',
        show: false,
        boundaryGap: false

      },
      yAxis: {
        show: false
      },
      series: [{
        type: 'line',
        data: orderTrend,
        areaStyle: {
          color: 'purple'
        },
        lineStyle: {
          width: 0
        },
        itemStyle: {
          opacity: 0
        },
        smooth:true


      }]
    }

    return {
      title,
      value,
      option,
      yesterdaySales
    }


  }
}
</script>

<style scoped>

</style>