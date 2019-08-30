<template lang="html">
  <div class="detail-hot fr">
    <div class="detail-hot-header">
      24小时热销榜
    </div>
    <ul class="detail-hot-list">
      <li class="detail-hot-list-item">
        <img src="../../assets/imgs/hot-1.png" alt="">
        <a href="#">严选礼品卡 1000元面值</a>
        <span>¥1000</span>
      </li>
      <li class="detail-hot-list-item">
        <img src="../../assets/imgs/hot-2.png" alt="">
        <a href="#">严选礼品卡 1000元面值</a>
        <span>¥1000</span>
      </li>
      <li class="detail-hot-list-item">
        <img src="../../assets/imgs/hot-3.png" alt="">
        <a href="#">严选礼品卡 1000元面值</a>
        <span>¥1000</span>
      </li>
      <li class="detail-hot-list-item">
        <img src="../../assets/imgs/hot-4.png" alt="">
        <a href="#">严选礼品卡 1000元面值</a>
        <span>¥1000</span>
      </li>
      <li class="detail-hot-list-item">
        <img src="../../assets/imgs/hot-5.png" alt="">
        <a href="#">严选礼品卡 1000元面值</a>
        <span>¥1000</span>
      </li>
      <li class="detail-hot-list-item nbb">
        <img src="../../assets/imgs/hot-6.png" alt="">
        <a href="#">严选礼品卡 1000元面值</a>
        <span>¥1000</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.detail-hot {width:300px;border:1px solid #e8e8e8;}
.detail-hot-header {
  width:298px;height:43px;line-height:43px;
  text-align:center;
  border:1px solid #e8e8e8;
  background:#f5f5f5;
  font-size:18px;font-weight:700;
}

.detail-hot-list {
  width:298px;
}
.detail-hot-list-item {
  width:250px;height:318px;
  margin:24px;margin-bottom:0;
  border-bottom:1px solid #e8e8e8;
}
.detail-hot-list-item img {
  display:block;
  width:250px;height:250px;
}
.detail-hot-list-item a {
  display:block;
  width:240px;height:18px;
  margin-bottom:8px;
  text-align:center;line-height:18px;
  font-size:14px;
  color:#333;
}
.detail-hot-list-item a:hover {
  color:#b4a078;
}

.detail-hot-list-item span {
  display:block;
  height:24px;line-height:24px;color:#d62525;
  text-align:center;
  font-size:14px;
}
</style>
