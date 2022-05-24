<template>
  <div class="liquid-fill">
    <p class="liquid-fill__title">用户月同步增长</p>
    <div class="liquid-fill__chart">
      <v-chart autoresize :option="option"></v-chart>
    </div>

  </div>
</template>

<script>
export default {
  name: "BottomLiquidFill",
  setup(props, ctx) {

    const option = {

      series: [{
        type: 'liquidFill',
        data: [0.6],
        label: {
          show: true,
          color: '#294D99',
          insideColor: '#fff',
          fontSize: 50,
          fontWeight: 'bold',

          align: 'center',
          baseline: 'middle',
          position: 'inside'
        },
        outline: {
          borderDistance: 0,
          itemStyle: {
            color: 'none',
            borderColor: '#ddd',
            borderWidth: 1,
            shadowBlur: 0,
            shadowColor: 'white'

          }
        },
        itemStyle: {
          color: 'pink',
          shadowColor: 'white',
          shadowBlur: 0
        },
        backgroundStyle: {
          color: 'white',

        },
        radius: '80%'

      }]
    };

    return {option}
  }


}
</script>

<style scoped>
.liquid-fill {

  background: white;
}

.liquid-fill__title {
  height: 50px;
  padding-left: 20px;
  line-height: 50px;
  border-bottom: 1px solid #dddddd;
  color: #333333;
}

.liquid-fill__chart {

  height: calc(100% - 50px);

}
</style>