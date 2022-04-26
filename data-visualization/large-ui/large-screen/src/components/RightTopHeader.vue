<template>
  <div class="top-header">
    <div class="top-header__item" v-for="(iconName,index) in iconNames">
      <div class="top-header__icon">
        <l-icon :name="iconName"></l-icon>
      </div>
      <div class="top-header__summary">
        <p>{{ titles[index].zh }}</p>
        <p>{{ titles[index].en }}</p>
        <p>
          <l-count-to></l-count-to>
        </p>
      </div>
    </div>
    <div class="top-header__info">
      <div v-for="info in infos">
        <img :src="info.img" alt="">
        <p>{{ info.title }}</p>
        <p>
          <l-count-to sufix="%"></l-count-to>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "RightTopHeader",
  setup(props, ctx) {
    const iconNames = ['money', 'orders', 'biaoqing', 'me'];
    const titles = [{zh: '今日销售额', en: 'Today Sales Amount'},
      {zh: '今日订单量', en: 'Today Total Orders'},
      {zh: '今日交易用户数', en: 'Today Payed Users'},
      {zh: '今日新增用户数', en: 'Today New Users'}
    ]

    const infos = [
      {title: '转化率', img: 'success.png'},
      {title: '退单率', img: 'failed.png'}
    ]

    infos.forEach(item => {
      item.img = '../../images/' + item.img
    })


    return {
      iconNames,
      titles,
      infos
    }
  }
}
</script>

<style scoped>
.top-header {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 40px;
  background: rgb(66, 66, 66);
}

.top-header__item {

  align-items: center;
  display: flex;


}

.top-header__icon {
  width: 185px;
  height: 185px;
  padding: 30px;
  border-radius: 50%;
  background: rgb(130, 168, 72);
  display: flex;
  align-items: center;
}

.top-header__summary {
  width: 400px;
  margin-left: 40px;
}

.top-header__summary > p:first-child {
  font-size: 32px;
}

.top-header__summary > p:nth-child(2) {
  font-size: 16px;
  letter-spacing: 1px;
}

.top-header__summary > :last-child {
  font-size: 56px;
  font-weight: bolder;
  letter-spacing: 2px;
  margin-top: 10px;
}

.top-header__info {
  display: flex;

}

.top-header__info > div {
  margin-left: 40px;
  text-align: center;
}

.top-header__info img {
  width: 90px;
  height: 90px;
}

.top-header__info p:nth-child(2) {
  font-size: 18px;

}

.top-header__info p:last-child {
  font-size: 28px;
  font-weight: bold;
  margin-top: 5px;
}


</style>


