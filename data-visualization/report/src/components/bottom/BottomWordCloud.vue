<template>
  <div>
    <p class="word-cloud__title">热门搜索</p>
    <div class="word-cloud__chart">
      <v-chart autoresize :option="option"></v-chart>
    </div>
  </div>


</template>

<script>
import {wordCloudData} from "../../../data/data";

export default {
  name: "BottomWordCloud",
  setup(props, ctx) {
    const data = wordCloudData.map(({word, count}) => ({name: word, value: count}));

    const option = {
      series: [{
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '70%',
        height: '80%',
        right: null,
        bottom: null,

        // Text size range which the value in data will be mapped to.
        // Default to have minimum 12px and maximum 60px size.

        sizeRange: [12, 60],

        // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

        rotationRange: [-90, 90],
        rotationStep: 45,

        // size of the grid in pixels for marking the availability of the canvas
        // the larger the grid size, the bigger the gap between words.

        gridSize: 8,

        // set to true to allow word being draw partly outside of the canvas.
        // Allow word bigger than the size of the canvas to be drawn
        drawOutOfBound: false,

        // If perform layout animation.
        // NOTE disable it will lead to UI blocking when there is lots of words.
        layoutAnimation: true,

        // Global text style
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          // Color can be a callback function or a color string
          color: function () {
            // Random color
            return 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')';
          }
        },
        emphasis: {
          focus: 'self',

          textStyle: {
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },

        // Data is an array. Each array item must have name and value property.
        data: data
      }]
    };
    return {option}
  }
}
</script>

<style scoped>

.word-cloud__title {
  height: 50px;
  background: white;
  color: #333333;
  padding-left: 20px;
  line-height: 50px;
  border-bottom: 1px solid #dddddd;
}

.word-cloud__chart {

  height: calc(100% - 50px);
  background: white;

}
</style>