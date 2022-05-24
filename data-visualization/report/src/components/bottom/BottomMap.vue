<template>
  <div class="map">
    <v-chart autoresize :option="option" @dblclick="handleClick"></v-chart>
  </div>
</template>

<script>

import {mapData} from "../../../data/data";

export default {
  name: "BottomMap",
  setup(props, ctx) {

    const {data, geo} = mapData;
    const dataList = data.map(item => {

      const {name, value: count} = item;
      const coords = geo[name];

      return {name, value: [...coords, count]};

    }).sort((a, b) => b.value[2] - a.value[2]);

    // console.log(dataList)
    const option = {
      title: {
        text: '销售数据大屏',
        subtext: '销售趋势统计',
        left: 'center',
        top: '2%'

      },
      tooltip: {
        trigger: 'item'
      },
      bmap: {
        center: [104.114129, 37.550339],
        zoom: 5,
        roam: false,
      },

      series: [
        {
          name: '销售额',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: dataList.slice(10),
          encode: {
            value: 2
          },
          itemStyle: {
            color: 'purple'
          },
          symbolSize(val) {

            return val[2] / 10;

          }
          // label: {
          //   show: false,
          //   position: 'right',
          //   formatter(params) {
          //     const {name, value} = params;
          //     return `${name}-${value[2]}`
          //   }
          // },
          // emphasis: {
          //   label: {
          //     show: true
          //   }
          //
          // }

        },
        {
          name: 'Top 10',
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: dataList.slice(0, 10),
          encode: {
            value: 2
          },
          symbolSize(val) {
            return val[2] / 10

          },
          rippleEffect: {
            brushType: 'stroke'
          },
          itemStyle: {
            color: 'purple',
            shadowBlur: 10,
            shadowColor: '#333'
          },
          emphasis: {
            focus: 'self'
          },
          zlevel: 1,
          selectedMode: 'single'


        }
      ]
    };

    const handleClick = (...args) => {

      //添加时间处理 会禁止地图缩放 等默认行为
      console.log(...args)
      return false
    }

    return {
      option,
      handleClick
    }

  }
}
</script>

<style scoped>
.map {
  position: relative;
}

</style>