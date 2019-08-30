<template lang="html">
  <div class="page">
    <cmpSlidebar/>
    <div class="manufacturer">
      <div class="common-header">
        <div class="fl">
          <h3 class="fl">品牌制造商</h3>
          <span class="fl small">工厂直达消费者，剔除品牌溢价</span>
        </div>
        <a href="#" class="fr more-btn">更多制造商 &gt;</a>
      </div>
      <div class="list clearfix">
        <a href="#" class="item fl large">
          <div class="content">
            <span class="title">海外制造商</span>
            <span class="price">9.9元起</span>
          </div>
          <img src="../../assets/imgs/manufacturer1.png" alt="">
        </a>
        <a href="#" class="item fl large" style="margin-left:9px;">
          <div class="content">
            <span class="title">海外制造商</span>
            <span class="price">9.9元起</span>
          </div>
          <img src="../../assets/imgs/manufacturer2.png" alt="">
        </a>
        <a href="#" class="item small fl" style="margin-left:10px;">
          <div class="content">
            <span class="title">海外制造商</span>
            <span class="price">9.9元起</span>
          </div>
          <img src="../../assets/imgs/manufacturer3.png" alt="">
        </a>
        <a href="#" class="item small fl" style="margin-left:10px;margin-top:10px;">
          <div class="content">
            <span class="title">海外制造商</span>
            <span class="price">9.9元起</span>
          </div>
          <img src="../../assets/imgs/manufacturer4.png" alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import cmpSlidebar from './cmp-slidebar';

export default {
  components: {
    cmpSlidebar
  }
}
</script>

<style lang="css" scoped>
.manufacturer {margin:0 auto;padding-top:30px;}
.common-header {width:1090px;height:28px;padding-bottom:20px;}
.common-header h3 {font-size:28px;font-weight:700;margin-right:20px;}
.common-header .small {margin-top:13px;font-size:14px;}
.common-header .more-btn {font-size:14px;padding-top:14px;color:#333;}
.manufacturer .list {}
.manufacturer .list .item {
  width:357px;height:155px;
  position:relative;
}
.manufacturer .list .large {
  width:357px;height:320px;
}

.manufacturer .content {position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;}
.manufacturer .list .large .title {
  display:block;
  width:357px;height:24px;
  text-align:center;
  margin:48px 0 19px;
  font-size:24px;color:#666;
}
.manufacturer .list .large .price {
  font-size:14px;padding-top:17px;display:inline-block;border-top:1px solid #666;
  color:#666;
}

.manufacturer .list .small .title {
  display:block;
  font-size:20px;
  margin:32px 0 10px 20px;
  text-align:left;
  color:#666;
}
.manufacturer .list .small .price {
  margin-left:20px;
  padding-top:10px;
  font-size:14px;
  color:#666;
  border-top:1px solid #666;
  float:left;
}

.manufacturer .item img {width:100%;height:100%;}
</style>
