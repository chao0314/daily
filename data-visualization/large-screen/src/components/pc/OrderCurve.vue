<template>
  <h2>
    订单走势
    <span class="sub">Order curve</span>
  </h2>
  <div id="order-curve">
    <v-chart :option="option" autoresize></v-chart>
  </div>
</template>

<script>
import {computed} from "vue";
import {trendList} from "../../../data/pc";

export default {
  name: "OrderCurve",
  setup(props, ctx) {

    const option = computed(() => {

      const ordersList = [];
      const salesList = [];
      const timesList = [];

      trendList.value.forEach(({orders, sales, time}) => {

        ordersList.push(orders);
        salesList.push(sales);
        const date = new Date(time);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        timesList.push(`${hour > 9 ? hour : '0' + hour}:${minutes > 9 ? minutes : '0' + minutes}`);
      })


      return {
        grid: {
          left: 50,
          right: 20,
          top: 40,
          bottom: 30,
        },
        legend: {
          data: ['销售额', '订单量']
        },
        xAxis: {
          data: timesList,

          },

         yAxis: [
        {
          type:'log',
          axisLabel: {
            color: "#EEE",
          },
          splitLine: {
            show: false,
          },
        },
        {
          show: false,
        },
      ],

        series: [
          {
            name: '销售额',
            type: 'bar',
            data: salesList,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function (idx) {
              return idx * 10;
            }
          },
          {
            name: '订单量',
            type: 'bar',
            data: ordersList,
            emphasis: {
              focus: 'series'
            },
            animationDelay: function (idx) {
              return idx * 10 + 100;
            }
          }
        ],

      }
    })

    return {
      option
    };
  }
}
</script>

<style scoped>

</style>