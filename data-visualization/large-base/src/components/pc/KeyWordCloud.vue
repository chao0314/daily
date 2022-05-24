<template>
  <h3>
    热门搜索词
    <span class="sub">Top Search</span>
  </h3>
  <div class="kwcloud-container">
    <ul class="kwcloud-list">
      <!--      <li>Mac Pro</li>-->
      <!--      <li>iPhone X</li>-->
      <!--      <li>华为P20</li>-->
      <!--      <li>韩都衣舍</li>-->
      <!--      <li>小米手机</li>-->

      <v-chart :option="option" autoresize></v-chart>
    </ul>
  </div>
</template>

<script>
import {keywordList} from "../../../data/pc";

export default {
  name: "KeyWordCloud",
  setup(props, ctx) {

    const option = {

      series: [{
        type: 'wordCloud',
        left: 'center',
        top: 'center',
        width: '90%',
        height: '90%',
        rotationRange: [0, 0],
        data: keywordList.value.map(v => ({name: v.keyword, value: v.count}))
      }]
    };

    return {option}
  }
}
</script>

<style scoped>

.kwcloud-list {

  /*background: red;*/
  width: 100%;
  height: 100%;
}

</style>