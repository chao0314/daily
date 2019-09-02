<template lang="html">
  <div class="goods-list fl">
    <search-goods-item></search-goods-item>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import SearchGoodsItem from "@/components/search/SearchGoodsItem.vue";

@Component({
  components: {
   SearchGoodsItem
  }
})
export default class SearchGoodsList extends Vue {
}
</script>

<style scoped>
/*  */
.goods-list {width:1090px;margin-right:-20px;}


.list-mode .goods-item {float:none;width:1020px;padding:20px 0;padding-right:10px;height:86px;}
.list-mode .line-1,.list-mode .line-1 img {float:left;height:82px;width:82px;}
.list-mode .line-2 {float:left;}
.list-mode .line-3 {float:left;}
</style>
