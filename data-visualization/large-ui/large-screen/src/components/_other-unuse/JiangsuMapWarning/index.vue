<template>
  <div style="width: 100%;height: 100%">
    <vue-echarts :options="options"/>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue'
import echarts from 'echarts'
import jiangsuMap from "../../../../data/jiangsuMap";

export default {
  name: 'JiangsuMapWarning',
  setup() {
    const options = ref({})
    const update = () => {
      // fetch('http://www.youbaobao.xyz/datav-res/datav/jiangsuMapData.json')
      //   .then(response => response.json())
      //   .then(data => {
      //     // console.log(data)
      //     const center = []
      //     data.features.forEach(item => {
      //       if (item.properties) {
      //         center.push({
      //           key: item.properties.name,
      //           value: item.properties.center
      //         })
      //       }
      //     })
      //     echarts.registerMap('jiangsu', data) // 注册地图
      //     options.value = {
      //       visualMap: {
      //         show: true,
      //         max: 100,
      //         seriesIndex: [0],
      //         inRange: {
      //           color: ['#a5dcf4', '#006edd']
      //         }
      //       },
      //       geo: [{
      //         map: 'jiangsu', // 使用自定义地图
      //         zoom: 1, // 默认显示级别
      //         roam: false, // 启动鼠标滚轮地图缩放
      //         scaleLimit: {
      //           min: 0,
      //           max: 3
      //         }, // 控制最大和最小缩放比例
      //         itemStyle: {
      //           areaColor: '#013c62',
      //           shadowColor: '#013c62',
      //           shadowBlur: 20,
      //           shadowOffsetX: -5,
      //           shadowOffsetY: 15
      //         }
      //       }],
      //       series: [{
      //         type: 'map',
      //         mapType: 'jiangsu',
      //         zoom: 1,
      //         roam: false,
      //         label: {
      //           show: true,
      //           color: '#fff',
      //           emphasis: {
      //             color: '#fff',
      //             show: false
      //           }
      //         },
      //         itemStyle: {
      //           normal: {
      //             borderColor: '#2980b9',
      //             borderWidth: 1,
      //             areaColor: '#12235c'
      //           },
      //           emphasis: {
      //             areaColor: '#fa8c16',
      //             borderWidth: 0
      //           }
      //         },
      //         data: center.map(centerItem => {
      //           const value = Math.random() * 100 // 人口数（单位：万）
      //           // console.log(centerItem.key, value)
      //           return {
      //             name: centerItem.key,
      //             value
      //           }
      //         })
      //       }]
      //     }
      //   })


      // console.log(data)
      const center = []
      data.features.forEach(item => {
        if (item.properties) {
          center.push({
            key: item.properties.name,
            value: item.properties.center
          })
        }
      })
      echarts.registerMap('jiangsu', jiangsuMap) // 注册地图
      options.value = {
        visualMap: {
          show: true,
          max: 100,
          seriesIndex: [0],
          inRange: {
            color: ['#a5dcf4', '#006edd']
          }
        },
        geo: [{
          map: 'jiangsu', // 使用自定义地图
          zoom: 1, // 默认显示级别
          roam: false, // 启动鼠标滚轮地图缩放
          scaleLimit: {
            min: 0,
            max: 3
          }, // 控制最大和最小缩放比例
          itemStyle: {
            areaColor: '#013c62',
            shadowColor: '#013c62',
            shadowBlur: 20,
            shadowOffsetX: -5,
            shadowOffsetY: 15
          }
        }],
        series: [{
          type: 'map',
          mapType: 'jiangsu',
          zoom: 1,
          roam: false,
          label: {
            show: true,
            color: '#fff',
            emphasis: {
              color: '#fff',
              show: false
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#2980b9',
              borderWidth: 1,
              areaColor: '#12235c'
            },
            emphasis: {
              areaColor: '#fa8c16',
              borderWidth: 0
            }
          },
          data: center.map(centerItem => {
            const value = Math.random() * 100 // 人口数（单位：万）
            // console.log(centerItem.key, value)
            return {
              name: centerItem.key,
              value
            }
          })
        }]
      }

    }

    onMounted(update)

    return {
      options
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
