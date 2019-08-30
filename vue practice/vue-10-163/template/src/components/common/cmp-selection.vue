<template lang="html">
  <ul class="order-type-list fl">
    <li class="fl" :class="{cur: index==cur}" v-for="item,index in data" :key="index" @click="cur=index">
      <a href="#">{{item}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    value: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      cur: this.value
    }
  },
  watch: {
    cur(){
      this.$emit('input', this.cur);
    }
  }
}
</script>

<style lang="css" scoped>
.order-type-list {}
.order-type-list li {
  padding:1px;
  border:1px solid #ddd;
  margin-right:10px;
  margin-bottom:15px;
}
.order-type-list li.cur {
  padding:0;
  border:2px solid #b4a078;
}
.order-type-list li a {
  display:block;
  padding:0 16px;
  height:26px;line-height:26px;
  font-size:12px;color:#333;
}
.order-type-list li.cur {}
</style>
