<template lang="html">
  <div class="item-detail clearfix">
    <div class="detail-switch">
      <div class="switch-header">
        <a href="#" class="header-btn active">宝贝详情</a>
        <a href="#" class="header-btn">累计评论 <span>356</span></a>
        <a href="#" class="header-btn">专享服务</a>
      </div>
      <div class="switch-item active">
        <ul class="detail-list">
          <li class="list-item">
            <i class="item-label">品牌:</i>
            <span class="item-text">品友</span>
          </li>
          <li class="list-item">
            <i class="item-label">材质:</i>
            <span class="item-text">棉棉</span>
          </li>
          <li class="list-item">
            <i class="item-label">含量:</i>
            <span class="item-text">50%(含)-69%(含)</span>
          </li>
          <li class="list-item">
            <i class="item-label">尺码:</i>
            <span class="item-text">35/S（女） 36/M（女） 37/L（女） 38/XL（女） 39/XXL（女） 40/3XL（女） 41/4XL（女） 37/S（男） 38/M（男） 44/5XL(男） 39/L（男） 40/XL（男） 41/XXL（男） 42/3XL（男） 43/4XL（男） 收藏加购优先发货 需要西裤、马甲、裙子可联系客服</span>
          </li>
          <li class="list-item">
            <i class="item-label">面料分类:</i>
            <span class="item-text">色织布</span>
          </li>
          <li class="list-item">
            <i class="item-label">图案:</i>
            <span class="item-text">纯色</span>
          </li>
        </ul>
       <detail-img></detail-img>
      </div>

      <div class="switch-item">
        评论...
      </div>

      <div class="switch-item">
        服务...
      </div>
    </div>
   <detail-footer></detail-footer>
  </div>
</template>

<script lang="ts">


import {Component, Vue, Prop} from 'vue-property-decorator';
import DetailImg from "@/components/detail/DetailImg.vue";
import DetailFooter from './DetailFooter.vue';


@Component({
  components: {DetailFooter, DetailImg}
})
export default class DetailInfo extends Vue {

}
</script>

<style scoped>
/*  */
.item-detail {margin-top:30px;width:1138px;border:1px solid #E5E5E5}
.item-detail .detail-switch {}
.item-detail .switch-header {height:46px;background:#f6f6f6}
.item-detail .header-btn {float:left;width:110px;height:47px;padding:0 10px;line-height:46px;text-align:center;border:1px solid #E5E5E5;border-top:none;border-bottom:none;margin-top:-1px;}
.item-detail .header-btn.active {width:110px;height:45px;background:#FFF;border-top:2px solid #F40;margin-top:-2px;}
.item-detail .switch-item {display:none;}
.item-detail .switch-item.active {display:block;}

.switch-item .detail-list {padding:10px 20px;overflow:hidden;border-bottom:1px solid #ccc;}
.detail-list .list-item {width:254px;margin-right:20px;float:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
</style>

<style lang="css">

</style>
