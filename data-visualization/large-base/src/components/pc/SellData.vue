<template>
  <h2>
    电商数据
    <span class="sub">Sell Data</span>
  </h2>
  <h3>销售量(万)</h3>
  <div class="sales">
    <span v-for="(n,i ) in integer" :key=i>{{ n }}</span>
    <span class="no-bg">.</span>
    <span>{{ float }}</span>
  </div>
  <h3>完成百分比</h3>
  <div class="percent-container">
    <div class="percent">
      <div class="bar" :style="{width:percent}">
        <div class="dot"></div>
        <div class="text">{{ percent }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {summaryInfo} from "../../../data/pc";
import {computed} from "vue";

export default {
  name: "SellData",
  setup(props, ctx) {

    const {totalSales, targetSales} = summaryInfo.value;

    const percent = computed(() => Math.floor((totalSales / targetSales) * 100) + '%');

    const integer = computed(() => `${Math.floor(totalSales / 10000)}`);
    const float = computed(() => Math.floor(totalSales / 1000) - Math.floor(totalSales / 10000) * 10);

    return {
      percent,
      integer,
      float
    }
  }
}
</script>

<style scoped>

</style>