<template>
  <div class="order-container">
    <div class="order-container-left">
      <h3>销售地区Top</h3>
      <div id="order-area">
        <v-chart :option="option" autosize></v-chart>
      </div>
    </div>
    <div class="order-split"></div>
    <div class="order-container-right">
      <h3>购买终端</h3>
      <div id="order-device"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderArea",
  setup(props, ctx) {

    const option = {}
    return {
      option
    }

  }
}
</script>

<style scoped>

#order-area {

  position: relative;
}

</style>