<template lang="html">
  <div>
    <div class="item-header clearfix">
      <div class="item-header-content fl">
        <!-- <div class="magnifier magnifier-show fl"> -->
       <detail-magnifier></detail-magnifier>
        <div class="item-info fr">
          <h2>{{goods.title}}</h2>
          <div class="info-container">
            <div class="info-item price">
              <i class="info-label">价格</i>
              <span class="info-text">¥{{goods.price}}</span>
            </div>
            <div class="info-item tbprice">
              <i class="info-label">淘宝价</i>
              <span class="info-text">¥{{goods.true_price}}</span>
            </div>
            <div class="info-item offer">
              <i class="info-label">优惠</i>
              <span class="info-text">淘金币可抵<strong>{{goods.offer}}</strong>元</span>
            </div>
            <div class="info-item sizes">
              <i class="info-label">尺码</i>
              <comp-size-selector :sizes="goods.sizes"></comp-size-selector>
            </div>
            <div class="info-item colors">
              <i class="info-label">颜色</i>
              <comp-color-selector :colors="goods.colors"></comp-color-selector>
            </div>
            <div class="info-item count">
              <i class="info-label">数量</i>
             <comp-number-input></comp-number-input>
            </div>
          </div>
          <div class="info-btn-group clearfix">
            <a href="#" class="info-btn-buy fl">立即购买</a>
            <a href="#" class="info-btn-cart fl">加入购物车</a>
          </div>
        </div>
      </div>
      <div class="item-header-shop fr">
        <div class="shop-title">时柳服饰</div>
        <ul class="shop-info">
          <li>
            掌柜：
            <a href="https://shiliu123.taobao.com/">柳青曦儿</a>
          </li>
          <li>
            联系：
            <a href="https://shiliu123.taobao.com/" class="ww">和我联系</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import DetailMagnifier from './DetailMagnifier.vue';
import CompColorSelector from "@/components/common/CompColorSelector.vue";
import CompNumberInput from "@/components/common/CompNumberInput.vue";
import CompSizeSelector from "@/components/common/CompSizeSelector.vue";
import {goods} from "@/type/detail";

@Component({
  components: {DetailMagnifier, CompSizeSelector, CompColorSelector, CompNumberInput}
})
export default class Info extends Vue {
  @Prop({type:Object,required:true,default:()=>{}}) goods!:goods;

}
</script>

<style scoped>
/*  */
.item-header {width:1138px;margin-top:10px;border:1px solid #E8E8E8}



.item-header-content {width:939px;border-right:1px solid #E8E8E8;}




.item-info {padding-right:20px;padding-bottom:20px;width:478px;}
.item-info h2 {padding-top:20px;padding-bottom:10px;color:#3C3C3C;min-height:21px;line-height:21px;font-weight:700;font-size:16px;}
.item-info .info-container {padding:10px;padding-left:0;}
.info-container .info-item {padding-bottom:5px;overflow:hidden;padding-top:9px;}
.info-container .info-label {float:left;padding-left:10px;color:#6c6c6c;width:60px;line-height:24px;}
.info-container .info-text {float:left;width:388px;line-height:24px;}
.info-container .price {background:#fff2e8;padding:10px 0;}
.info-container .price .info-text {text-decoration:line-through;}
.info-container .tbprice {background:#fff2e8;padding:8px 0;}
.info-container .tbprice .info-text {color:#F40;font-size:26px;font-weight:bold;}
.info-container .offer {background:#fff9f5;}

/*  */
.item-header-shop {padding:14px 10px 17px 20px;width:168px;}
.shop-title {line-height:20px;min-height:20px;font-size:12px;font-weight:bold}
.item-header-shop .ww {background:url(../../assets/imgs/T15AD7FFFaXXbJnvQ_-130-60.gif) no-repeat;width:67px;height:20px;display:inline-block; text-indent:-9999px;}

.info-btn-group a {text-align:center;font:16px/38px tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;}
.info-btn-group .info-btn-buy {width:134px;height:38px;border:1px solid #F0CAB6;color:#E5511D;background:#FFE4D0;margin-right:9px;}
.info-btn-group .info-btn-cart {width:180px;height:38px;border:1px solid #F40;color:#FFF;background:#F40;}
</style>

<style lang="css">

</style>
