<template>
  <div class="right-scroll">
    <l-scroll-list :header="header" :data="data" :size="size" :loop="true"></l-scroll-list>
  </div>

</template>

<script>
import screenData from "../../data/screen";
import {ref} from 'vue';

export default {
  name: "RightScrollList",
  setup(props, ctx) {

    const header = [{order: '城市订单量'}, {shop: '店铺数'},
      {rider: '接单骑手人数'}, {newShop: '新店铺数量'},
      {avgOrder: '人均订单量'}];
    const size = 10;
    const data = ref(screenData.areaSales);

    // setTimeout(() => {
    //
    //   console.log('timeout')
    //   data.value = screenData.areaSales.slice(0).map(item => ({...item, order: 666}))
    // }, 5000)
    return {
      header,
      data,
      size
    }
  }
}
</script>

<style scoped>
.right-scroll {
  height: 100%;
  width: 100%;
}
</style>