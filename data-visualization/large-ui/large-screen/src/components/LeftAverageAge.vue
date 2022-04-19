<template>
  <div class="average-age">
    <div class="average-age__title">
      <p>
        <span>用户年龄分布&平均年龄</span>
        <span>Distribution of Age</span>
      </p>
      <p>
        <l-count-to :decimals="2" :endVal="averageAge" :duration="1000"></l-count-to>
        <span>岁</span>
      </p>
    </div>
    <div class="average-age__chart">
      <v-chart autoresize :option="option"></v-chart>
    </div>
    <div class="average-age__category">
      <div class="average-age__category-item" v-for="item  in ageData">
        <p>{{ item.value }}</p>
        <p class="average-age__category-item-bottom">
          <span :style="{background:item.color}"></span>
          <span>{{ item.category }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import screenData from '../../data/screen';

const colors = ["rgb(116,166,49)", "rgb(190,245,99)", "rgb(202,252,137)", "rgb(251,253,142)"];

export default {
  name: "LeftAverageAge",
  setup(props, ctx) {
    const {age, averageAge} = screenData;
    let maxValue = 0

    const ageData = age.reduce((accumulator, item, index) => {
      maxValue += item.value;
      accumulator.push({
        startVal: 0,
        category: item.key,
        value: item.value,
        color: colors[index]
      })

      return accumulator;

    }, [])

    const option = {

      tooltip: {
        textStyle: {
          fontSize: 28
        },
        padding: 10
      },
      yAxis: {
        type: 'category',
        data: ageData.map(item => item.category),
        show: false
      },
      xAxis: {
        type: 'value',
        max: maxValue,
        splitLine: {
          show: false
        },
        axisLabel: {
          color: 'rgb(100,105,115)',
          fontSize: 18
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgb(50,60,60)',
            width: 3
          }

        }


      },
      series: [

        {
          type: 'bar',
          stack: 'ageCategory',
          barWidth: 15,
          data: [{
            name: ageData[0].category,
            value: ageData[0].value,
            itemStyle: {
              color: ageData[0].color
            }

          }]

        },
        {
          type: 'bar',
          stack: 'ageCategory',
          barWidth: 15,
          data: [{
            name: ageData[1].category,
            value: ageData[1].value,
            itemStyle: {
              color: ageData[1].color
            }


          }]

        },
        {
          type: 'bar',
          stack: 'ageCategory',
          barWidth: 15,
          data: [{
            name: ageData[2].category,
            value: ageData[2].value,
            itemStyle: {
              color: ageData[2].color
            }


          }]

        },
        {
          type: 'bar',
          stack: 'ageCategory',
          barWidth: 15,
          data: [{
            name: ageData[3].category,
            value: ageData[3].value,
            itemStyle: {
              color: ageData[3].color
            }


          }]

        }

      ]


    }

    return {
      ageData,
      averageAge: +averageAge,
      option
    }
  }
}
</script>

<style scoped>
.average-age {
  padding: 20px 40px;
  background: rgb(45, 45, 45);
  /*transform: scale(3);*/
  /*position: absolute;*/
  /*left: 1000px;*/
  /*top: 500px;*/
}

.average-age__title {
  display: flex;
}

.average-age__title > p:first-child {
  display: flex;
  flex-direction: column;
  margin-right: 40px;
}

.average-age__title > p:first-child > span:first-child {

  font-size: 32px;
  font-weight: bold;
}

.average-age__title > p:first-child > span:last-child {

  font-size: 16px;

}

.average-age__title > p:last-child {
  font-size: 68px;
}

.average-age__title > p:last-child > span:last-child {

  font-size: 20px;
  margin-left: 10px;
}

.average-age__chart {
  height: 120px;
}

.average-age__category {

  display: flex;
  justify-content: space-around;
  margin-top: 5px;
  font-size: 30px;
  font-weight: bolder;
}


.average-age__category-item-bottom {

  display: flex;
  align-items: center;
  justify-content: center;

}

.average-age__category-item-bottom > span:first-child {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #EEEEEE;
}

.average-age__category-item-bottom > span:last-child {
  margin-left: 10px;
  font-size: 20px;
}

</style>