<template>
  <h2>
    统计数据
    <span class="sub">Statistics Data</span>
  </h2>
  <div class="statistics-container">
    <div class="row">
      <div class="item">
        <div class="icon">
          <img src="pc/images/shop.png"/>
        </div>
        <div class="info">
          <div class="num">{{ totalOrd }}</div>
          <div class="title">订单总数(万)</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="pc/images/coin.png"/>
        </div>
        <div class="info">
          <div class="num">{{ totalSal }}</div>
          <div class="title">销售总量(万元)</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="item">
        <div class="icon">
          <img src="pc/images/bell.png"/>
        </div>
        <div class="info">
          <div class="num">{{ perSales }}</div>
          <div class="title">人均消费</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="pc/images/task.png"/>
        </div>
        <div class="info">
          <div class="num">{{ last10MinOrderCount }}</div>
          <div class="title">近10分钟新增订单数</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {summaryInfo} from "../../../data/pc";
import {computed} from "vue";

export default {
  name: "StatisticsData",
  setup(props, ctx) {

    const {totalOrder, totalSales, last10MinOrderCount} = summaryInfo.value;

    const totalOrd = computed(() => (totalOrder / 10000).toFixed(1));
    const totalSal = computed(() => (totalSales / 10000).toFixed(1));
    const perSales = computed(() => (totalSales / totalOrder).toFixed(1));
    return {
      totalOrd,
      totalSal,
      perSales,
      last10MinOrderCount
    }

  }
}
</script>

<style scoped>

</style>