<template>
  <div class="total-rider">
    <p>骑手情况</p>
    <p>Rider Growth Rate</p>
    <div class="total-rider__chart">
      <v-chart autoresize :option="option"></v-chart>
    </div>
  </div>
</template>

<script>
import screenData from "../../data/screen";

const colors = ['rgb(209,248,139)', 'rgb(115,201,245)', 'rgb(124,136,146)'];
export default {
  name: "LeftTotalRider",
  setup(props, ctx) {

    const riderData = screenData.rider;
    // console.log(riderData)
    const category = riderData.axisX;
    const riderOrderData = riderData.orderData;
    const option = {
      grid: {
        top: 60,
        bottom: 30,
        left: 40,
        right: 40
      },
      legend: {
        top: 20,
        right: 40,
        icon: "rect",
        textStyle: {
          fontSize: 16,
          color: colors[2]

        }

      },
      tooltip: {
        axisPointer: {
          type: 'cross'
        }

      },
      xAxis: {
        type: "category",
        axisTick: {show: false},
        data: category,

      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[2]
          }
        },
        splitLine: {
          lineStyle: {
            type: 'dotted'
          }
        }

      },
      series: [{
        name: 'lastYear',
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: riderOrderData.data1
      }, {
        name: 'thisYear',
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: riderOrderData.data2
      }]

    }
    return {
      option
    }
  }
}
</script>

<style scoped>
.total-rider {
  padding: 10px 40px 0;
  background: rgb(45, 45, 45);
  height: 100%;
  /*transform-origin: left;*/
  /*transform: scale(3);*/
}

.total-rider > p:last-child {
  font-size: 32px;
}

.total-rider > p:nth-child(2) {
  font-size: 16px;
  margin-top: 10px;
}

.total-rider__chart {
  height: 240px;
}

</style>