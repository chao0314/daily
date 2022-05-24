<template>
  <div class="common-chart sales-sunburst">
    <v-chart :option="option"></v-chart>
  </div>
</template>

<script>
import sunburst from "../../data/sunburst";

export default {
  name: "SalesSunburst",
  setup(props, ctx) {
    const bgColor = '#2e2733';
    const colors = ['rgb(0,211,255)', 'rgb(0,123,255)', 'rgb(0,218,234)', 'rgb(35,69,145)', '#9A2555'];

    const option = {
      backgroundColor: bgColor,
      colors,
      series: [
        {
          type: 'sunburst',
          data: sunburst,
          center: ['50%', '50%'],
          levels: [
            {},
            {
              r0: 0,
              r: 30,
              label: {
                rotate: 0
              }
            }, {
              r0: 30,
              r: 95
            },
            {
              r0: 105,
              r: 130,
              itemStyle: {
                color: 'transparent'
              },
              label: {
                rotate: 'tangential',
                fontSize: 10
              }

            },
            {
              r0: 130,
              r: 135,
              label: {
                position: 'outside',
                textShadowColor: '#333',
                textShadowBlur: 5
              },
              itemStyle: {
                shadowColor: colors[0],
                shadowBlur: 80
              },
              downplay:{
                label:{
                  opacity:0.1
                }
              }
            }
          ],
          itemStyle:{
            borderColor:bgColor,
            borderWidth:2
          }
        }
      ]


    };
    return {
      option
    }
  }
}
</script>

<style scoped>

.sales-sunburst {
  height: 500px;
}
</style>