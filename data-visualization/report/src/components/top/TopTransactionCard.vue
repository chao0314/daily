<template>
  <com-card :title="title" :value="value">
    <template #default>
      <v-chart autoresize :option="option"></v-chart>
    </template>
    <template #footer>
      <p>退货率 <span class="emphasis">{{ returnRate }}</span></p>
    </template>
  </com-card>

</template>

<script>
import ComCard from "@/components/top/ComCard";
import {reportData} from "../../../data/data";

export default {
  name: "TopTransactionCard",
  components: {ComCard},
  setup(props, ctx) {

    const title = '今日交易用户数';
    const value = '8765,4321';
    const returnRate = '5.50%';
    const {orderUserTrend, orderUserTrendAxis} = reportData;
    const option = {
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      xAxis: {
        show: false,
        type: 'category',
        data: orderUserTrendAxis
      },
      yAxis: {
        show: false
      },
      series: [{
        type: 'bar',
        name: '实时交易量',
        barWidth: '50%',
        data: orderUserTrend
      }],
      tooltip: {}


    }

    return {
      title,
      value,
      returnRate,
      option
    }
  }
}
</script>

<style scoped>

</style>