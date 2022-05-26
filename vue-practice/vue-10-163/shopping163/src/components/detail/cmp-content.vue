<template lang="html">
  <div class="detail-detail fl">
    <div class="detail-detail-header clearfix">
      <a href="#" class="detail-detail-header-btn fl">详情</a>
    </div>
    <ul class="detail-detail-table">
      <li class="detail-detail-table-item fl">
        <label class="fl">材质</label>
        <span class="fl">全棉</span>
      </li>
      <li class="detail-detail-table-item fl">
        <label class="fl">款式</label>
        <span class="fl">床单式</span>
      </li>
        <li class="detail-detail-table-item fl">
          <label class="fl">适用季节</label>
          <span class="fl">四季通用</span>
        </li>
        <li class="detail-detail-table-item fl">
          <label class="fl">图案</label>
          <span class="fl">几何</span>
        </li>
        <li class="detail-detail-table-item large fl">
          <label class="fl">风格</label>
          <span class="fl">现代简约、日式</span>
        </li>
        <li class="detail-detail-table-item large fl">
          <label class="fl">尺寸</label>
          <span class="fl">1.5米床： 被套 200*230cm/ 枕套：48*74cm*2/ 床单：245*250cm<br/>1.8米/ 2.0米床：被套 220*240cm/ 枕套：48*74cm*2/ 床单：245*270cm</span>
        </li>
    </ul>
    <div class="detail-detail-imglist">
      <img src="../../assets/imgs/detail-1.jpg" alt="">
      <img src="../../assets/imgs/detail-2.jpg" alt="">
      <img src="../../assets/imgs/detail-3.jpg" alt="">
      <img src="../../assets/imgs/detail-4.jpg" alt="">
      <img src="../../assets/imgs/detail-5.jpg" alt="">
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.detail-detail {width:750px;}

.detail-detail-table {width:750px;margin-bottom:17px;padding-top:18px;}
.detail-detail-table-item {
  width:315px;line-height:24px;
  padding:8px 30px;
  border-bottom:1px dashed #e8e8e8;
}
.detail-detail-table-item.large {
  width:690px;
}
.detail-detail-table-item label {display:block;width:105px;font-size:14px;}
.detail-detail-table-item span {display:block;font-size:14px;color:#999;line-height:24px;}

.detail-detail-imglist {width:750px;}
.detail-detail-imglist img {width:750px;display:block;}
</style>
