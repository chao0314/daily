<template lang="html">
  <div class="ad-list fr">
    <h2>掌柜热卖</h2>
    <ul class="ad-list-container">
      <li class="ad-item">
        <div class="img">
          <a href="#">
            <img src="https://img.alicdn.com/imgextra/i3/119129597/O1CN01GOgET42KlTYUvb2aq_!!0-saturn_solar.jpg_270x270.jpg" alt="">
          </a>
        </div>
        <div class="line1">
          <div class="price-sale clearfix">
            <div class="price fl">
              ￥19.00
            </div>
            <div class="sale fr">
              销量：<i>566</i>
            </div>
          </div>
          <div class="title">
            商品的标题商品的标题商品的标题
          </div>
        </div>
      </li>
      <li class="ad-item">
        <div class="img">
          <a href="#">
            <img src="https://img.alicdn.com/imgextra/i3/119129597/O1CN01GOgET42KlTYUvb2aq_!!0-saturn_solar.jpg_270x270.jpg" alt="">
          </a>
        </div>
        <div class="line1">
          <div class="price-sale clearfix">
            <div class="price fl">
              ￥19.00
            </div>
            <div class="sale fr">
              销量：<i>566</i>
            </div>
          </div>
          <div class="title">
            商品的标题商品的标题商品的标题
          </div>
        </div>
      </li>
      <li class="ad-item">
        <div class="img">
          <a href="#">
            <img src="https://img.alicdn.com/imgextra/i3/119129597/O1CN01GOgET42KlTYUvb2aq_!!0-saturn_solar.jpg_270x270.jpg" alt="">
          </a>
        </div>
        <div class="line1">
          <div class="price-sale clearfix">
            <div class="price fl">
              ￥19.00
            </div>
            <div class="sale fr">
              销量：<i>566</i>
            </div>
          </div>
          <div class="title">
            商品的标题商品的标题商品的标题
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';


@Component
export default class AdList extends Vue {
}
</script>

<style scoped>
/*  */
.ad-list {width:270px;margin-top:10px;}
.ad-list h2 {color:#555;font-weight:bold;padding-bottom:10px;}
.ad-list .ad-item {width:270px;height:300px;border:1px solid #e5e5e5; margin:10px 0;}
.ad-list .ad-item .img, .ad-list .ad-item img {width:270px;height:270px;}
.ad-list .line1 {margin:5px 10px;width:248px;height:18px;line-height:18px;position:relative;}
.ad-list .price {font:700 18px Verdana,Arial;color:#F40;line-height:18px;}
.ad-list .sale {color:#999;}
.ad-list .sale i {color:#555;}
.ad-list .title {width:270px;height:75px;position:absolute;top:-80px;left:-10px;background:rgba(255,255,255,0.8);font:12px/1.5 tahoma,arial,\5b8b\4f53;font-weight:bold;display:none;}

.ad-list .ad-item:hover {border-color:#F40}
.ad-list .ad-item:hover .title {display:block;}
</style>
