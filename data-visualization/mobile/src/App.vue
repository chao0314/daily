<template>
  <div class="home">
    <div class="home-wrapper">
      <top-header></top-header>
      <SalesBar></SalesBar>
      <SalesLine></SalesLine>
      <sales-pie></sales-pie>
    </div>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader";
import SalesBar from "@/components/SalesBar";
import SalesLine from "@/components/SalesLine";
import SalesPie from "@/components/SalesPie";

export default {
  name: 'App',
  components: {
    TopHeader,
    SalesBar,
    SalesLine,
    SalesPie
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
