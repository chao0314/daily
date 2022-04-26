<template>
  <div class="total-device">
    <div class="total-device__chart">
      <v-chart autoresize :option="option"></v-chart>
    </div>
    <div class="total-device__info">
      <div class="total-device__summary">
        <div>
          <p>登录设备</p>
          <p>Distribution of Internet Devices</p>
        </div>
        <p>
          <l-count-to :endVal="totalDevices" :duration="1000"></l-count-to>
          <span>台</span>
        </p>
      </div>
      <div class="total-device__category">
        <div class="total-device__item" v-for="item in data">
          <p>{{ item.value }}</p>
          <p><span :style="{background:item.itemStyle.color}"></span><span>{{ item.name }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import screenData from "../../data/screen";

const colors = ["rgb(176,207,120)", "rgb(157,195,90)", "rgb(131,167,72)"];

export default {
  name: "LeftTotalDevice",
  setup(pros, ctx) {

    const {totalDevices, devices} = screenData;
    // console.log(totalDevices, devices);
    const data = devices.map((device, index) => ({
      name: device.key,
      value: device.value,
      itemStyle: {
        color: colors[index]
      }
    }))


    const option = {
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: 'total device',
              type: 'pie',
              roseType: 'radius',
              label: {show: false},
              emphasis: {
                itemStyle: {
                  color: 'rgb(140,250,180)'
                }
              },
              data

            }

          ]
        }
    ;
    return {
      option,
      totalDevices,
      data
    }
  }
}
</script>

<style scoped>
.total-device {
  display: flex;
  height: 100%;
  /*background: rgb(45, 45, 45);*/
  /*transform: scale(3);*/
  /*transform-origin: left;*/
  background: rgb(45, 45, 45);

}

.total-device__chart {
  flex-basis: 30%;
}

.total-device__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px 10px 40px 0;
}

.total-device__summary {
  display: flex;

}

.total-device__summary > div:first-child > p:first-child {

  font-size: 32px;
}

.total-device__summary > div > p:last-child {

  font-size: 20px;
  margin-top: 10px;
}

.total-device__summary > p:last-child {
  margin-left: 40px;
  font-weight: bold;
  font-size: 56px;
}

.total-device__summary > p:last-child > span:last-child {
  font-size: 16px;
}


.total-device__category {
  display: flex;
  justify-content: space-around;
}

.total-device__item {
  font-size: 30px;
  font-weight: bolder;
}

.total-device__item > p:last-child > span:first-child {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.total-device__item > p:last-child > span:last-child {

  margin-left: 10px;
  font-size: 20px;

}


</style>