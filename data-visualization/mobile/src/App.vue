<template>
  <div class="home">
    <div class="home-wrapper">
      <top-header></top-header>
      <SalesBar></SalesBar>
      <SalesLine></SalesLine>
      <sales-pie></sales-pie>
      <sales-sunburst></sales-sunburst>
      <sales-radar></sales-radar>
    </div>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader";
import SalesBar from "@/components/SalesBar";
import SalesLine from "@/components/SalesLine";
import SalesPie from "@/components/SalesPie";
import SalesSunburst from "@/components/SalesSunburst";
import SalesRadar from "@/components/SalesRadar";

export default {
  name: 'App',
  components: {
    TopHeader,
    SalesBar,
    SalesLine,
    SalesPie,
    SalesSunburst,
    SalesRadar
  }
}
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
}
*{
  box-sizing: border-box;
}

.common-chart{
  height: 325px;
  margin: 12px;
  background:rgba(255,255,255,0.1);
}

</style>
<style scoped>
.home-wrapper {
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  background-image: url('../public/images/bg.png');
  color: white;
}

</style>
