<template>
  <div class="home">
    <div class="home-wrapper">
      <top-header></top-header>
      <SalesBar></SalesBar>

    </div>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader";
import SalesBar from "@/components/SalesBar";

export default {
  name: 'App',
  components: {
    TopHeader,
    SalesBar
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
