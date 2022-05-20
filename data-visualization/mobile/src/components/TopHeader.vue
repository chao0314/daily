<template>
  <div class="top-header">
    <p>数据展示</p>
    <p>移动报表</p>
    <p>最后更新时间：{{timeText}}前</p>
  </div>
</template>

<script>
export default {
  name: "TopHeader",
  setup(props,ctx) {

    const timeText =  '1分钟'
    return{

      timeText
    }


  }


}
</script>

<style scoped>

.top-header{
  padding: 25px 24px;
  /*background: pink;*/
}
.top-header>p:first-child{

  font-size: 24px;
  font-weight: 500;

}

.top-header >p:nth-child(2){

  font-size: 18px;
  margin-top: 10px;
}

.top-header >p:last-child{

  font-size: 12px;
  margin-top: 20px;
  font-weight: 300;
  color: rgb(255,255,255,0.5);
}
</style>