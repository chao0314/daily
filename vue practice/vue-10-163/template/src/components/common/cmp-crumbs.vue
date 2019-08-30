<template lang="html">
  <div class="crumbs">
    <router-link :to="{ name: 'index'}">全部商品</router-link>
    <template v-for="path,index in pathArr">
      <span class="spliter">&gt;</span>
      <a :href="path.url" :class="{cur: index==pathArr.length-1}">{{path.title}}</a>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    pathArr: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
.crumbs {
  padding:24px 0;font-size:12px;
}

.crumbs a {
  color:#333;
}
.crumbs a.cur {
  color:#999;
}

.crumbs .spliter {
  margin:0 7px;
}
</style>
