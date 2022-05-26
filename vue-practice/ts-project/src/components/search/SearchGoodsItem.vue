<template lang="html">
  <div class="goods-item fl" @click="showDetail">
    <div class="line-1">
      <img :src="goods.img|imgPath" alt="">
    </div>
    <div class="line-2 clearfix">
      <span class="price fl">￥{{goods.price}}</span>
      <span class="sales fr">{{goods.sales}}人付款</span>
    </div>
    <div class="line-3">
      <a :href="goods.href">{{goods.title}}</a>
    </div>
    <div class="line-4 clearfix">
      <a :href="goods.shophref" class="shop fl">{{goods.shopname}}</a>
      <span class="location fr">江浙沪</span>
    </div>
    <div class="line-5">
      <a class="ww" href="https://amos.alicdn.com/getcid.aw?spm=a230r.1.14.23.3cb833a3sAEzZI&v=3&groupid=0&s=1&charset=utf-8&uid=%E5%AE%89%E6%9D%B0%E5%BA%93%E6%9C%8D%E9%A5%B0%E6%97%97%E8%88%B0%E5%BA%97&site=cntaobao&fromid=cntaobaobBTTzmyevGWGiqYdBOfi5uI8aO7trBRfC1Pzw4_GbICPOQ5OziSfWZ94l8YpC3GVa6cpk3Pa9vibBR8L1y4EQ">旺旺</a>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {goodsData} from "@/type/search";

@Component
export default class SearchGoodsItem extends Vue {
  @Prop({type:Object}) goods!:goodsData;
  showDetail(){
    this.$router.push({path:'/detail'});
  }
}
</script>

<style scoped>
.goods-item {width:250px;height:390px; margin-top:22px; margin-right:20px; border:1px solid #ededed; float:left}
.goods-item:hover {border-color:#f40;transition:.3s all ease;}

.goods-item .line-1, .goods-item .line-1 img {width:250px;height:250px;}
.goods-item .line-2 {height:22px;line-height:22px;margin-top:11px;overflow:hidden;padding:0 10px;}
.goods-item .line-2 .price {font-size:18px;color:#F40;font-family: arial;}
.goods-item .line-2 .sales {color:#888;}
.goods-item .line-3 {margin-top:6px;padding:0 10px; color:#3d3d3d;font:12px/1.5 tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;font-weight:400;}
.goods-item .line-4 {margin-top:5px;padding:0 10px;}
.goods-item .line-4 .shop {color:#888;line-height:22px;}
.goods-item .line-4 .location {color:#888;}
.goods-item .line-5 {margin-top:10px;padding:0 10px;}
.goods-item .line-5 .ww {float:right;background:url(../../assets/imgs/site-icons.png) no-repeat -435px -86px;width:16px;height:16px;text-indent:-99999px;}
</style>
