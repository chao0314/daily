<template>
  <div class="order-map">
    <v-chart autoresize :option="option"></v-chart>
  </div>
</template>

<script>
import {ref} from 'vue';
import {registerMap} from "echarts";
import chinaMap from "../../data/chinaMap";

export default {
  name: "RightOrderMap",
  setup(props, ctx) {
    const colors = ['#1DE9B6', '#F46E36', '#04B9FF', '#5DBD32', '#FFC809', '#FB95D5', '#BDA29A', '#6E7074', '#546570', '#C4CCD3'];
    const mainCity = {
      '北京': [116.4551, 40.2539],
      '上海': [121.4648, 31.2891],
      '深圳': [114.065702, 22.551393],
      '广州': [113.268554, 23.13507],
      '杭州': [120.214935, 30.255328],
      '南京': [118.802997, 32.064407]
    };

    const geoCoordMap = {
      '江苏': [118.8062, 31.9208],
      '黑龙江': [127.9688, 45.368],
      '内蒙古': [110.3467, 41.4899],
      '吉林': [125.8154, 44.2584],
      '北京': [116.4551, 40.2539],
      '辽宁': [123.1238, 42.1216],
      '河北': [114.4995, 38.1006],
      '天津': [117.4219, 39.4189],
      '山西': [112.3352, 37.9413],
      '陕西': [109.1162, 34.2004],
      '甘肃': [103.5901, 36.3043],
      '宁夏': [106.3586, 38.1775],
      '青海': [101.4038, 36.8207],
      '新疆': [87.9236, 43.5883],
      '四川': [103.9526, 30.7617],
      '重庆': [108.384366, 30.439702],
      '山东': [117.1582, 36.8701],
      '河南': [113.4668, 34.6234],
      '安徽': [117.29, 32.0581],
      '湖北': [114.3896, 30.6628],
      '浙江': [119.5313, 29.8773],
      '福建': [119.4543, 25.9222],
      '江西': [116.0046, 28.6633],
      '湖南': [113.0823, 28.2568],
      '贵州': [106.6992, 26.7682],
      '云南': [102.9199, 25.4663],
      '广东': [113.12244, 23.009505],
      '广西': [108.479, 23.1152],
      '海南': [110.3893, 19.8516],
      '上海': [121.4648, 31.2891]
    }
    const d1 = {
      '江苏': 10041,
      '黑龙江': 4093,
      '内蒙古': 1157,
      '吉林': 4903,
      '北京市': 2667,
      '辽宁': 8331,
      '河北': 23727,
      '天津': 681,
      '山西': 5352,
      '陕西': 38,
      '甘肃': 77,
      '宁夏': 65,
      '青海': 10,
      '新疆': 193,
      '四川': 309,
      '重庆': 77,
      '山东': 21666,
      '河南': 15717,
      '安徽': 15671,
      '湖北': 3714,
      '浙江': 3141,
      '福建': 955,
      '江西': 4978,
      '湖南': 778,
      '贵州': 33,
      '云南': 149,
      '广东': 1124,
      '广西': 125,
      '海南': 7,
      '上海': 2155

    }
    const d2 = {
      '江苏': 159,
      '黑龙江': 5,
      '内蒙古': 54,
      '吉林': 10,
      '北京市': 0,
      '辽宁': 0,
      '河北': 1679,
      '天津': 1,
      '山西': 2698,
      '陕西': 1744,
      '甘肃': 362,
      '宁夏': 429,
      '青海': 122,
      '新疆': 731,
      '四川': 3925,
      '重庆': 1480,
      '山东': 79,
      '河南': 1017,
      '安徽': 208,
      '湖北': 1209,
      '浙江': 1418,
      '福建': 1237,
      '江西': 1004,
      '湖南': 1511,
      '贵州': 345,
      '云南': 1429,
      '广东': 2242,
      '广西': 2271,
      '海南': 59,
      '上海': 8

    }
    const d3 = {
      '江苏': 11788,
      '黑龙江': 1944,
      '内蒙古': 2954,
      '吉林': 3482,
      '北京市': 1808,
      '辽宁': 5488,
      '河北': 27035,
      '天津': 2270,
      '山西': 13623,
      '陕西': 4221,
      '甘肃': 754,
      '宁夏': 1783,
      '青海': 91,
      '新疆': 1907,
      '四川': 4905,
      '重庆': 1420,
      '山东': 39781,
      '河南': 16154,
      '安徽': 7914,
      '湖北': 6802,
      '浙江': 5812,
      '福建': 3345,
      '江西': 4996,
      '湖南': 5627,
      '贵州': 1504,
      '云南': 2725,
      '广东': 6339,
      '广西': 1009,
      '海南': 0,
      '上海': 1988

    }
    const d4 = {
      '江苏': 10041,
      '黑龙江': 4093,
      '内蒙古': 1157,
      '吉林': 4903,
      '北京市': 2667,
      '辽宁': 8331,
      '河北': 23727,
      '天津': 681,
      '山西': 5352,
      '陕西': 38,
      '甘肃': 77,
      '宁夏': 65,
      '青海': 10,
      '新疆': 193,
      '四川': 309,
      '重庆': 77,
      '山东': 21666,
      '河南': 15717,
      '安徽': 15671,
      '湖北': 3714,
      '浙江': 3141,
      '福建': 955,
      '江西': 4978,
      '湖南': 778,
      '贵州': 33,
      '云南': 149,
      '广东': 1124,
      '广西': 125,
      '海南': 7,
      '上海': 2155

    }
    const d5 = {
      '江苏': 159,
      '黑龙江': 5,
      '内蒙古': 54,
      '吉林': 10,
      '北京市': 0,
      '辽宁': 0,
      '河北': 1679,
      '天津': 1,
      '山西': 2698,
      '陕西': 1744,
      '甘肃': 362,
      '宁夏': 429,
      '青海': 122,
      '新疆': 731,
      '四川': 3925,
      '重庆': 1480,
      '山东': 79,
      '河南': 1017,
      '安徽': 208,
      '湖北': 1209,
      '浙江': 1418,
      '福建': 1237,
      '江西': 1004,
      '湖南': 1511,
      '贵州': 345,
      '云南': 1429,
      '广东': 2242,
      '广西': 2271,
      '海南': 59,
      '上海': 8

    }
    const d6 = {
      '江苏': 11788,
      '黑龙江': 1944,
      '内蒙古': 2954,
      '吉林': 3482,
      '北京市': 1808,
      '辽宁': 5488,
      '河北': 27035,
      '天津': 2270,
      '山西': 13623,
      '陕西': 4221,
      '甘肃': 754,
      '宁夏': 1783,
      '青海': 91,
      '新疆': 1907,
      '四川': 4905,
      '重庆': 1420,
      '山东': 39781,
      '河南': 16154,
      '安徽': 7914,
      '湖北': 6802,
      '浙江': 5812,
      '福建': 3345,
      '江西': 4996,
      '湖南': 5627,
      '贵州': 1504,
      '云南': 2725,
      '广东': 6339,
      '广西': 1009,
      '海南': 0,
      '上海': 1988

    }
    const data = [d1, d2, d3, d4, d5, d6];


    const options = [];

    Object.entries(mainCity).forEach((city, index) => {
      const [name, cityCoords] = city;
      const cityData = data[index];
      const categoryData = Object.keys(cityData).sort((key1, key2) => cityData[key1] - cityData[key2]);
      // console.log(categoryData);
      const effectScatterData = Object.entries(geoCoordMap).map(([name, coords]) => {

        return {
          name,
          value: coords.concat(cityData[name])
        }

      })

      const barData = categoryData.map(category => cityData[category]);

      const linesData = Object.values(geoCoordMap).map(coords => ({
            coords: [cityCoords, coords]
          }
      ))

      options.push({
        title: [{
          text: '销售数据地图',
          subtext: 'Order Data Map',
          top: '2%',
          left: '2%',
          textStyle: {
            color: '#fff',
            fontSize: 35,
            fontWeight: '700'
          },
          subtextStyle: {
            color: '#ddd',
            fontSize: 20
          }
        }, {
          text: `${name}统计情况`,
          left: '75%',
          top: '5%',
          textStyle: {
            color: '#fff',
            fontSize: 25
          }
        }],
        xAxis: {
          type: 'value',
          position: 'top',
          min: 0,
          boundaryGap: false,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 2,
            color: '#aaa'
          }
        },
        yAxis: {
          type: 'category',
          data: categoryData,
          axisLine: {
            lineStyle: {
              color: '#ddd'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            color: '#ddd'
          }
        },
        series: [{
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: effectScatterData,
          symbolSize: function (val) {
            return val[2] / 1000
          },
          rippleEffect: {
            brushType: 'stroke'
          },
          // hoverAnimation: true,
          emphasis: {scale: true},
          label: {
            show: true,
            position: 'right',
            formatter: function (params) {
              return params.data.name

            }
          },
          itemStyle: {
            color: colors[index],
            shadowColor: colors[index],
            shadowBlur: 10
          },

          zlevel: 1
        }, {
          type: 'lines',
          data: linesData,
          effect: {
            show: true,
            period: 4,
            symbol: 'arrow',
            symbolSize: 3,
            trailLength: 0.02
          },
          lineStyle: {
            color: colors[index],
            width: 0.1,
            opacity: 0.5,
            curveness: 0.3

          },
          zlevel: 2
        }, {
          type: 'bar',
          data: barData,
          itemStyle: {
            color: colors[index]

          }
        }]
      })


    })


    registerMap('china', chinaMap);
    const option = {
      timeline: {
        data: Object.keys(mainCity),
        axisType: 'category',
        autoPlay: true,
        playInterval: 3000,
        left: '10%',
        right: '10%',
        bottom: '5%',
        label: {
          color: '#ddd'
        },
        symbolSize: 10,
        lineStyle: {
          color: '#555'
        },

        checkpointStyle: {
          borderColor: '#777',
          borderWidth: 2
        },
        controlStyle: {
          color: '#666',
          borderColor: '#666'
        },
        progress: {
          label: {
            color: '#fff'
          },
          // lineStyle: {
          //   color:'#fff'
          // },
          // itemStyle:{
          //   color:"#fff"
          // }

        },
        emphasis: {
          label: {
            show: true,
            color: 'green'
          },
          controlStyle: {
            color: '#aaa',
            borderColor: '#aaa'
          }
        }


      },
      baseOption: {
        backgroundColor: '#424446',
        grid: {
          top: '10%',
          right: '5%',
          bottom: '15%',
          width: '20%'
        },
        geo: {
          map: 'china',
          roam: true,
          scaleLimit: {
            min: 0.5,
            max: 2
          },
          center: [113.83531246, 34.0267395887],
          itemStyle: {
            borderColor: 'rgba(147,235,248,1)',
            borderWidth: 1,
            areaColor: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {offset: 0, color: 'rgba(147,235,248,0)'},
                {offset: 1, color: 'rgba(147,235,248,0.2)'}
              ]
            },
            shadowColor: 'rgba(128,217,248,1)',
            shadowBlur: 10
          },
          emphasis: {
            itemStyle: {
              areaColor: '#389bb7'
            },
            label: {
              show: false
            }

          }
        }
      },
      options
    };


    return {

      option
    }

  }
}
</script>

<style scoped>
.order-map {
  width: 100%;
  height: 100%;
  /*transform: scale(1.5);*/
  /*background: pink;*/
}

</style>