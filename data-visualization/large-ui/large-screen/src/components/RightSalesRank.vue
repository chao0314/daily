<template>
  <div class="activate-user">
    <div class="title">地区商家销售排行</div>
    <div class="list-wrapper">
      <div class="list-inner" v-for="(item, index) in data" :key="index">
        <div class="list">
          <div class="list-title">{{ item.city }}</div>
          <div class="list-separator-wrapper">
            <div class="list-separator"/>
          </div>
          <div class="chart-wrapper">
            <div class="img-wrapper">
              <img :src="item.img">
            </div>
            <div class="chart">
              <v-chart :option="item.option"></v-chart>
            </div>
          </div>
          <div class="category-wrapper">
            <l-tab :titles="['商家','订单','销售']"></l-tab>
          </div>
          <div class="list-content-wrapper">
            <div class="list-item-wrapper" v-for="(value, index) in item.shop" :key="index">
              <div class="list-item">{{ value.shop }}</div>
              <div class="list-item">{{ value.order }}</div>
              <div class="list-item list-item-sales">{{ value.sales }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import screenData from "../../data/screen";

export default {
  name: "RightSalesRank",
  setup() {
    // console.log(screenData.areaTop);
    const data = screenData.areaTop.slice(0, 3).map((item, index) => ({
      ...item, img: `/images/rank-${index + 1}.png`, option: {
        color: ['rgb(210, 244, 148)', 'rgb(79, 79, 79)'],
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        title: {
          text: item.rate,
          left: 'center',
          top: '60%',
          textStyle: {
            color: 'rgb(210, 244, 148)',
            fontSize: 18,
            align: 'center'
          }
        },
        series: [
          {
            name: '活跃占比',
            type: 'pie',
            radius: ['70%', '90%'],
            // avoidLabelOverlap: true,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 50 + index * 10,
                name: '活跃用户'
              },
              {
                value: 50 - index * 10,
                name: '非活跃用户'
              }
            ]
          }
        ]
      }
    }));
    // console.log(data);

    return {
      data
    }


  }
}
</script>

<style scoped>

.activate-user {
  width: 100%;
  height: 100%;
  background: #373737;
  padding-right: 20px;
  box-sizing: border-box;
}

.activate-user .title {
  font-size: 36px;
  margin-left: 20px;
  padding: 20px 40px 0;
  box-sizing: border-box;
}

.activate-user .list-wrapper {
  display: flex;
  width: 100%;
  height: 563px;
  margin-top: 20px;
  padding: 0 10px;
  box-sizing: border-box;
}

.activate-user .list-wrapper .list-inner {
  flex: 0 0 33.33%;
  width: 33.33%;
  padding: 0 10px;
  box-sizing: border-box;
}

.activate-user .list-wrapper .list-inner .list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #2d2d2d;
}

.activate-user .list-wrapper .list-inner .list .list-title {
  font-size: 24px;
  padding: 10px 20px;
  box-sizing: border-box;
}

.activate-user .list-wrapper .list-inner .list .list-separator-wrapper {
  position: relative;
  height: 30px;
  background: #5d5d5d;
}

.activate-user .list-wrapper .list-inner .list .list-separator-wrapper .list-separator {
  position: absolute;
  top: 7.5px;
  right: 15px;
  width: 15px;
  height: 15px;
  background: #323232;
}

.activate-user .list-wrapper .list-inner .list .chart-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  margin-top: 20px;
}

.activate-user .list-wrapper .list-inner .list .chart-wrapper .img-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.activate-user .list-wrapper .list-inner .list .chart-wrapper .img-wrapper img {
  width: 42px;
  height: 42px;
  margin-top: 60px;
}

.activate-user .list-wrapper .list-inner .list .chart-wrapper .chart {
  width: 100%;
  height: 100%;
}

.activate-user .list-wrapper .list-inner .list .category-wrapper {
  margin-top: 20px;
  font-size: 24px;
}

.activate-user .list-wrapper .list-inner .list .list-content-wrapper {
  flex: 1;
  margin-top: 20px;
  overflow: hidden;
}

.activate-user .list-wrapper .list-inner .list .list-content-wrapper .list-item-wrapper {
  display: flex;
  height: 33.33%;
}

.activate-user .list-wrapper .list-inner .list .list-content-wrapper .list-item-wrapper .list-item {
  display: flex;
  justify-content: center;
  flex: 0 0 33.33%;
  width: 33.33%;
  font-size: 28px;
}

.activate-user .list-wrapper .list-inner .list .list-content-wrapper .list-item-wrapper .list-item-sales {
  color: #b2d17e;
}


</style>