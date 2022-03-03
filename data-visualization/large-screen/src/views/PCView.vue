<template>
  <div id="container">
    <header>
      <div class="time">
        {{(new Date()).toLocaleString()}}
      </div>
    </header>
    <main>
      <div class="column left">
        <sell-data></sell-data>
        <key-word-cloud></key-word-cloud>
      </div>
      <div class="column main">
        <order-curve></order-curve>
        <order-area></order-area>
      </div>
      <div class="column right">
        <statistics-data></statistics-data>
        <super-order></super-order>
      </div>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import SellData from "@/components/pc/SellData";
import KeyWordCloud from "@/components/pc/KeyWordCloud";
import OrderCurve from "@/components/pc/OrderCurve";
import OrderArea from "@/components/pc/OrderArea";
import StatisticsData from "@/components/pc/StatisticsData";
import SuperOrder from "@/components/pc/SuperOrder";

export default {
  name: 'pcView',
  components: {OrderArea, SellData, KeyWordCloud, OrderCurve, StatisticsData, SuperOrder}
}
</script>
