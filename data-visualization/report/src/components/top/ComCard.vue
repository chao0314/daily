<template>
  <el-card shadow="hover">
    <p class="title">{{ title }}</p>
    <p class="value">{{ value }}</p>
    <div class="charts">
      <slot></slot>
    </div>
    <hr class="line">
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "ComCard",
  props: {
    title: {
      type: String,
      default: 'title'
    },
    value: {
      type: String,
      default: 'value'
    }

  }
}
</script>

<style scoped>
.line {
  background-color: #EEEEEE;
  border: 0;
  height: 1px;
  margin: 10px 0;
}

.charts {
  /*background: pink;*/
  height: 50px;
}

.title {
  font-size: 12px;
  color: #999;
}

.value {
  font-size: 25px;
  color: #0c0d0e;
  margin-top: 5px;
  letter-spacing: 1px;

}

.footer {

  font-size: 12px;
  color: #666;
}

</style>