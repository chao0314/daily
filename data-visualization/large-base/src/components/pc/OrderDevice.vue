<template>
  <div id="order-device">
    <v-chart :option="option" autoresize></v-chart>
  </div>
</template>

<script>
import {deviceList} from "../../../data/pc";

export default {
  name: "OrderDevice",
  setup(props, ctx) {


    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
      },
      series: [
        {
          name: 'device',
          type: 'pie',
          radius: [20, 80],
          center: ['50%', '40%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          label: {
            show: true
          },
          labelLine: {
            length: 14,
            length2: 2
          },
          data: deviceList.value.map(v => ({value: v.count, name: v.device}))
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
#order-device{

  position: relative;
}

</style>