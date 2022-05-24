<template>
  <div class="common-chart sales-pie">
    <div v-for="(item,index) of options" :key="index">
      <v-chart :option="item"></v-chart>
    </div>
  </div>
</template>

<script>
import data from "../../data";

export default {
  name: "SalesPie",
  setup(props, ctx) {
    const salePie = data.salePie;
    const options = salePie.map(pieData => {

      const {name: title, total: value, data} = pieData;

      return {

        title: [
          {
            text: title,
            textStyle: {
              color: 'rgba(255,255,255,0.3)',
              fontSize: 12
            }
          }, {
            text: value,
            textStyle: {
              color: 'white',
              fontSize: 16,
              fontWeight: 500
            },
            top: '45%',
            left: '35%'

          }

        ],
        series: [
          {
            name: title,
            type: 'pie',
            radius: ['60%', '80%'],
            label: {
              show: false
            },
            data: [
              {
                name: '数据1',
                value: data[0],
                itemStyle: {
                  color: 'rgb(0,140,218)'
                }
              }, {
                name: '数据2',
                value: data[1],
                itemStyle: {
                  color: 'rgb(35,70,145)'
                }
              }
            ]
          }
        ]


      }


    })

    return {options}
  }
}
</script>

<style scoped>
.sales-pie {
  display: flex;
}

.sales-pie > div {
  flex: 1 1 auto;
  height: 300px;
  width: 33.33%;
  /*background: pink;*/
}

.sales-pie > div:not(:last-child) {
  margin-right: 6px;
}


</style>