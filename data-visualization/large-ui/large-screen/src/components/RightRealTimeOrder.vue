<template>
  <div class="real-time-order">
    <div class="real-time-order-left">
      <div class="title">实时订单趋势图</div>
      <div class="sub-title">Number Of Real-time Orders</div>
      <div class="total">
        <l-count-to separator="," autoplay></l-count-to>
      </div>
      <div class="tiny-title">周同比增长率</div>
      <div class="percent-text">
        <span class="percent-text-1">
          <l-count-to :end-val="88" suffix="%"> </l-count-to>
        </span>
      </div>
    </div>
    <div class="real-time-order-right">
      <v-chart :option="option"></v-chart>
    </div>
  </div>
</template>

<script>

import {graphic} from 'echarts';

const realTimeOrderMockData = {
  "date": ["12:25:13", "12:25:17", "12:25:22", "12:25:27", "12:25:32", "12:25:37", "12:25:42", "12:25:47", "12:25:52", "12:25:57"],
  "data": [1143, 769, 251, 733, 335, 969, 869, 1390, 168, 1391]
}

export default {
  name: 'RightRealTimeOrder',
  setup(props) {


    const option = {
      grid: {
        top: 40,
        bottom: 80,
        right: 40,
        left: 80
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: realTimeOrderMockData.date,
        axisLine: {
          lineStyle: {
            color: 'rgba(200, 200, 200)'
          }
        },
        axisLabel: {
          fontSize: 16
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: 'rgb(50, 50, 50)'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(200, 200, 200)'
          }
        },
        axisLabel: {
          fontSize: 16
        }
      },
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100
      }, {
        start: 0,
        end: 100,
        handleIcon: 'path://M 0.0525 0.5656 L 0.0525 0 L -0.0583 0 L -0.0583 0.5656 L -0.2449 0.5656 L -0.2449 1.4344 L -0.0525 1.4344 L -0.0525 2 L 0.0525 2 L 0.0525 1.4344 L 0.2449 1.4344 L 0.2449 0.5656 L 0.0525 0.5656 Z M 0.1399 1.1953 L -0.1458 1.1953 L -0.1458 1.1137 L 0.1399 1.1137 L 0.1399 1.1953 Z M 0.1399 0.8863 L -0.1458 0.8863 L -0.1458 0.8047 L 0.1399 0.8047 L 0.1399 0.8863 Z',
        handleSize: '100%',
        handleStyle: {
          color: '#a7b7cc'
        },
        textStyle: {
          color: 'rgb(200, 200, 200)'
        },
        fillerColor: 'rgba(120,126,134,.3)',
        dataBackground: {
          lineStyle: {
            color: 'grey'
          },
          areaStyle: {
            color: 'gray'
          }
        },
        borderColor: 'rgb(200, 200, 200)'
      }],
      series: [
        {
          name: '实时数据',
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1,
                [
                  {
                    offset: 0,
                    color: '#C2C90B'
                  },
                  {
                    offset: 0.5,
                    color: '#A1DC14'
                  },
                  {
                    offset: 1,
                    color: 'rgb(188, 222, 129)'
                  }
                ])
          },
          data: realTimeOrderMockData.data
        }
      ],

    }

    return {
      option
    }
  }
}
</script>

<style scoped>

.real-time-order {
  display: flex;
  width: 100%;
  height: 100%;
  background: #1c1c1c;
}

.real-time-order .real-time-order-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 0 0 320px;
  width: 320px;
  padding-left: 40px;
  box-sizing: border-box;
}

.real-time-order .real-time-order-left .title {
  font-size: 32px;
}

.real-time-order .real-time-order-left .sub-title {
  font-size: 16px;
  letter-spacing: 1px;
  margin-top: 10px;
}

.real-time-order .real-time-order-left .total {
  font-size: 68px;
  font-weight: bolder;
  letter-spacing: 2px;
  padding: 10px 0;
}

.real-time-order .real-time-order-left .tiny-title {
  font-size: 18px;
  color: #fff;
  line-height: 36px;
}

.real-time-order .real-time-order-left .percent-text {
  font-size: 28px;
  letter-spacing: 2px;
}

.real-time-order .real-time-order-left .percent-text .percent-text-1 {
  color: #c5fb79;
  font-weight: bolder;
}

.real-time-order .real-time-order-right {
  flex: 1;
}

.real-time-order .real-time-order-right {
  width: 100%;
  height: 100%;
}


</style>