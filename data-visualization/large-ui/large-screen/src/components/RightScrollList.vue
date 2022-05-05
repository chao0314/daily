<template>
  <div class="right-scroll">
    <l-scroll-list :header="header" :data="data"></l-scroll-list>
  </div>

</template>

<script>
import screenData from "../../data/screen";

export default {
  name: "RightScrollList",
  setup(props, ctx) {

    const header = [{order: '城市订单量'}, {shop: '店铺数'},
      {rider: '接单骑手人数'}, {newShop: '新店铺数量'},
      {avgOrder: '人均订单量'}];
    const data = screenData.areaSales;

    return {
      header,
      data
    }
  }
}
</script>

<style scoped>
.right-scroll{
  height: 100%;
  overflow: hidden;
}
</style>