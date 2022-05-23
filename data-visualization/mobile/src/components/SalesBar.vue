<template>
  <div class="common-chart sales-bar">
    <v-chart :option="option"></v-chart>
  </div>
</template>

<script>
import data from "../../data";

export default {
  name: "SalesBar",
  setup(props, ctx) {
    const salesBar = data.salesBar;
    const option = {
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      title: {
        top: '10',
        text: '今天销售额：123456元',
        textStyle: {
          color: 'white'
        }
      },
      tooltip:{
        trigger:'axis',
        axisPointer:{
          type:"shadow"
        }

      },
      xAxis: {
        type: 'value',
        axisLabel: {
          show: false
        },
        // axisTick:{
        //   show: false
        // },
        // axisLine:{
        //   show:false
        // },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        }

      },
      yAxis: {
        type: 'category',
        data: salesBar.axis,
        axisLabel: {
          color: 'white'
        }

      },
      series: [
        {
          name: '平台流量',
          type: 'bar',
          data: salesBar.data1,
          itemStyle: {
            color: 'rgb(194,52,50)'
          }

        },
        {
          name: '外部流量',
          type: 'bar',
          data: salesBar.data2,
          itemStyle: {
            color: 'rgb(0,140,218)'
          }

        }
      ]


    }
    return {
      option

    }

  }
}
</script>

<style scoped>


</style>