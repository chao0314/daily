<template>
  <div class="common-chart">
    <v-chart :option="option"></v-chart>
  </div>
</template>

<script>
import Data from "../../data";

export default {
  name: "SalesRadar",
  setup(props, ctx) {
    const {indicator, data} = Data.salesRadar;
    console.log(indicator, data)
    const option = {
      radar: {
        indicator,
      },
      series: [
        {
          name: '运营指标',
          type: 'radar',
          data
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

</style>