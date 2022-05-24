<template>
  <div class="order-container">
    <div class="order-container-left">
      <h3>销售地区Top</h3>
      <div id="order-area">
        <v-chart :option="option" autoresize></v-chart>
      </div>
    </div>
    <div class="order-split"></div>
    <div class="order-container-right">
      <h3>购买终端</h3>
      <order-device></order-device>
    </div>
  </div>
</template>

<script>
import OrderDevice from "@/components/pc/OrderDevice";
import {cityList} from "../../../data/pc";
import {coord} from "@/libs/geo";

export default {
  name: "OrderArea",
  components: {OrderDevice},
  setup(props, ctx) {
    let total = 0;
    const coordList = cityList.value.map(v => {

      total += v.count;
      return {
        name: v.province, value: [...coord([v.province]), v.count]
      }
    })

    const topList = coordList.sort((a, b) => b.value.count - a.value.count).slice(0, 3);

    const option = {
      tooltip: {
        trigger: 'item'
      },
      bmap: {
        center: [104.114129, 37.550339],
        zoom: 4,
        roam: false,
        mapStyle: {
          styleJson: [
            {
              featureType: 'water',
              elementType: 'all',
              stylers: {
                color: '#044161'
              }
            },
            {
              featureType: 'land',
              elementType: 'all',
              stylers: {
                color: '#004981'
              }
            },
            {
              featureType: 'boundary',
              elementType: 'geometry',
              stylers: {
                color: '#064f85'
              }
            },
            {
              featureType: 'railway',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'highway',
              elementType: 'geometry',
              stylers: {
                color: '#004981'
              }
            },
            {
              featureType: 'highway',
              elementType: 'geometry.fill',
              stylers: {
                color: '#005b96',
                lightness: 1
              }
            },
            {
              featureType: 'highway',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'arterial',
              elementType: 'geometry',
              stylers: {
                color: '#004981'
              }
            },
            {
              featureType: 'arterial',
              elementType: 'geometry.fill',
              stylers: {
                color: '#00508b'
              }
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'green',
              elementType: 'all',
              stylers: {
                color: '#056197',
                visibility: 'off'
              }
            },
            {
              featureType: 'subway',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'manmade',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'local',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'arterial',
              elementType: 'labels',
              stylers: {
                visibility: 'off'
              }
            },
            {
              featureType: 'boundary',
              elementType: 'geometry.fill',
              stylers: {
                color: '#029fd4'
              }
            },
            {
              featureType: 'building',
              elementType: 'all',
              stylers: {
                color: '#1a5787'
              }
            },
            {
              featureType: 'label',
              elementType: 'all',
              stylers: {
                visibility: 'off'
              }
            }
          ]
        }
      },
      series: [
        {
          name: '销售额',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: coordList,
          encode: {
            value: 2
          },
          symbolSize: function (val) {
            return val[2] * 50 / total;
          },
          label: {
            formatter: '{b}',
            position: 'right'
          },
          itemStyle: {
            color: '#ddb926'
          },
          emphasis: {
            label: {
              show: true
            }
          }
        },
        {
          name: 'Top 3',
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          data: topList,
          encode: {
            value: 2
          },
          symbolSize: function (val) {
            return val[2] * 50 / total;
          },
          showEffectOn: 'emphasis',
          rippleEffect: {
            brushType: 'stroke'
          },
          // hoverAnimation: true,
          emphasis: {
            scale: false
          },
          label: {
            formatter: '{b}',
            position: 'right',
            show: true
          },
          itemStyle: {
            color: 'red',
            shadowBlur: 10,
            shadowColor: '#333'
          },
          zlevel: 1
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

#order-area {

  position: relative;
}

</style>