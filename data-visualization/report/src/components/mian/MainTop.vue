<template>
  <div class="main-top">
    <el-card shadow="hover">
      <template #header>
        <div class="main-top__header">
          <el-menu
              :default-active="activeIndex"
              mode="horizontal"
              @select="handleMenuSelect"
          >
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>

          <div class="main-top__date">
            <el-radio-group v-model="radio">
              <el-radio-button label="今日"/>
              <el-radio-button label="本周"/>
              <el-radio-button label="本月"/>
              <el-radio-button label="今年"/>
            </el-radio-group>
            <div>
              <el-date-picker
                  v-model="date"
                  type="daterange"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"

              />
            </div>
          </div>

        </div>
      </template>

      <div class="main-top__body">
        <div class="main-top__bar">
          <v-chart autoresize :option="option"></v-chart>
        </div>
        <div class="main-top__list">
          <p>排行榜</p>
          <ul>
            <li v-for="(order,index) of orderRank">
              <span :class="[{'top-active':index<3}]">{{ order.no }}</span>
              <span>{{ order.name }}</span>
              <span>{{ order.money }}</span>
            </li>
          </ul>
        </div>
      </div>

    </el-card>

  </div>
</template>

<script>
import {ref, watch} from "vue";
import {reportData} from "../../../data/data";

export default {
  name: "MainTop",
  setup(props, ctx) {

    const activeIndex = ref('1');
    const radio = ref('今日');
    const date = ref('');
    const shortcuts = [
      {
        text: '最近周一',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        },
      },
      {
        text: '最近一个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        },
      },
      {
        text: '最近三个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        },
      },
    ]
    const handleMenuSelect = (index) => {

      console.log('menu selected', index)
    }

    const {orderFullYear, orderFullYearAxis, orderRank} = reportData;
    // console.log(orderRank)
    const option = {
      grid: {
        top: 70,
        left: 60,
        right: 60,
        bottom: 50
      },

      title: {
        text: '年度销售额',
        textStyle: {
          fontSize: 14,
          color: '#666'
        },
        left: 25,
        top: 20
      },

      xAxis: {
        type: 'category',
        data: orderFullYearAxis,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#333'
        },
        axisTick: {
          alignWithLabel: true,
          lineStyle: {
            color: '#999'
          }
        }
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: 'dotted',
            color: '#eee'
          }
        }


      },
      tooltip: {},
      color:['#3398DB'],
      series: [
        {
          type: 'bar',
          barWidth:'35%',
          data: orderFullYear
        }
      ]


    }
    return {
      handleMenuSelect,
      activeIndex,
      radio,
      shortcuts,
      date,
      option,
      orderRank

    }

  }
}
</script>

<style scoped>
.main-top {
  background: pink;
  margin-top: 20px;
}

.main-top__header {

  position: relative;

}

.main-top__date {

  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  height: 30px;
  justify-content: center;
}

.main-top__date > div {

  line-height: 30px;

}

.main-top__body {

  width: 100%;
  display: flex;
  height: 270px;
}

.main-top__bar {

  width: 65%;
  height: 100%
}

.main-top__list {

  width: 35%;
  /*background: lightgreen;*/
  height: 100%;
}

.el-radio-group {

  margin-right: 20px;
}


.el-menu--horizontal {
  border-bottom: none;

}

.el-menu-item {
  height: 30px;
  line-height: 30px;
}

.main-top__list > p {
  margin-bottom: 10px;
  color: #999;
}

.main-top__list li {

  /*background: pink;*/
  height: 30px;
  line-height: 30px;
  margin: 4px 0;
  color: #333;
  font-size: 14px;
}

.main-top__list span:first-child {

  display: inline-block;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  margin-right: 5px;

}

.top-active {
  background: black;
  color: white;
  border-radius: 12px;
}


.main-top__list span:last-child {

  float: right;

}


</style>
