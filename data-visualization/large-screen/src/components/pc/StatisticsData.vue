<template>
  <h2>
    统计数据
    <span class="sub">Statistics Data</span>
  </h2>
  <div class="statistics-container">
    <div class="row">
      <div class="item">
        <div class="icon">
          <img src="pc/images/shop.png"/>
        </div>
        <div class="info">
          <div class="num">98.6</div>
          <div class="title">订单总数(万)</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="pc/images/coin.png"/>
        </div>
        <div class="info">
          <div class="num">32.02</div>
          <div class="title">销售总量(万元)</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="item">
        <div class="icon">
          <img src="pc/images/bell.png"/>
        </div>
        <div class="info">
          <div class="num">81.7</div>
          <div class="title">人均消费</div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="pc/images/task.png"/>
        </div>
        <div class="info">
          <div class="num">36</div>
          <div class="title">近10分钟新增订单数</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatisticsData"
}
</script>

<style scoped>

</style>