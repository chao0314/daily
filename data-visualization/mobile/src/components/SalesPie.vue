<template>
  <div class="common-chart sales-pie">
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </div>
</template>

<script>
export default {
  name: "SalesPie",
  setup(props,ctx){

    const options = [];

    return options
  }
}
</script>

<style scoped>
.sales-pie {
  display: flex;
}

.sales-pie > div {
  flex: 1 1 auto;

}

</style>