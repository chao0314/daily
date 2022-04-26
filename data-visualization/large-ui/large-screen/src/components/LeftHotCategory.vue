<template>
  <div class="hot-category">
    <div class="hot-category__head">
      <div class="hot-category__title">
        <p>当前热卖品类</p>
        <p>Hot Categories</p>
      </div>
      <div class="hot-category__date">
        <span>最近更新时间：</span>
        <span>2088-88-88 12:00:00</span>
      </div>
    </div>
    <div class="hot-category__chart">
      <v-chart autoresize :option="option"></v-chart>
    </div>
  </div>
</template>

<script>
import screenData from "../../data/screen";

export default {
  name: "LeftHotCategory",
  setup(props, ctx) {

    const hotCategory = screenData.category.data1;
    // console.log(hotCategory)
    const category = hotCategory.axisX;
    const option = {
      grid: {
        left: 40,
        right: 0,
        top: 30,
        bottom: 30
      },
      tooltip: {
        axisPointer: {
          type: 'cross'
        }
      },
      legend: {
        textStyle:{
          color:'white',
          fontSize:16,
          fontWeight:'bolder'
        }
      },
      xAxis: {
        type: 'category',
        data: category,
        axisLabel: {
          color: 'rgb(98,105,115)',
          fontSize: 16
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: 'rgb(125,135,145)'
          }
        }

      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgb(125,135,145)'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            type: 'dotted'
          }
        },
        axisLabel: {
          color: 'rgb(98,105,115)',
          fontSize: 16
        }


      },
      color: ['rgb(210,250,140)', 'rgb(65,90,65)'],
      series: [
        {
          name: '当月',
          type: 'bar',
          stack: 'hotCategory',
          data: hotCategory.data1
        },
        {
          name: '上月',
          type: 'bar',
          stack: 'hotCategory',
          data: hotCategory.data2
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
.hot-category {
  background: rgb(45, 45, 45);
  height: 100%;
  padding: 20px 40px;
  /*transform-origin: left;*/
  /*transform: translateY(-500px) scale(3);*/

}

.hot-category__head {
  display: flex;
  justify-content: space-between;

}

.hot-category__title {
  font-size: 40px;
}

.hot-category__title > p:last-child {
  font-size: 20px;
}

.hot-category__date {
  align-self: center;
  font-size: 20px;
}

.hot-category__chart {
  height: 220px;
  /*background: pink;*/
}

</style>