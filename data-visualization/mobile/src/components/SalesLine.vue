<template>
  <div class="common-chart">
    <v-chart :option="option"></v-chart>
  </div>
</template>

<script>
import data from "../../data";

export default {
  name: "SalesLine",
  setup(props, ctx) {
    const lineData = data.saleLine;
    const option = {
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true

      },
      title:{
        text:'访问&成交趋势图',
        textStyle:{
          color:'#fff'
        },
        left: 10,
        top:10
      },
      legend:{
        data:['访问量','成交量','KPI'],
        right:5,
        itemWidth:15,
        textStyle:{
          color:'white'
        }
      },
      xAxis: {
        type: 'category',
        data: lineData.axis,
        axisLabel:{
          color:'rgba(255,255,255,0.3)'
        },
        axisLine:{
          show:false
        },
        axisTick:{
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLabel:{
          color:'rgba(255,255,255,0.3)'
        },
        splitLine:{
          lineStyle:{
            color:'rgba(255,255,255,0.1)'
          }

        }

      },
      series: [
        {
          name: '访问量',
          type: 'line',
          data: lineData.data1,
          smooth: true,
          itemStyle: {
            opacity:0,
            color:'rgb(0,163,233)'
          }
        },
        {
          name: '成交量',
          type: 'line',
          data: lineData.data2,
          smooth: true,
          itemStyle: {
            opacity: 0,
            color: 'yellow'
          }
        }, {
          name: 'KPI',
          type: 'line',
          data: lineData.data3,
          smooth: true,
          itemStyle: {
            opacity:0,
            color:'red'
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