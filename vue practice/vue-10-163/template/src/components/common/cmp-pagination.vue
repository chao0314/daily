<template lang="html">
  <div class="pagenation-container">
    <div class="pagenation clearfix">
      <a href="javascript:;" class="fl large" :class="{disabled: page==1}" @click="prev()">上一页</a>
      <a href="javascript:;" class="fl" v-for="p in total" :class="{active: page==p}" @click="page=p">{{p}}</a>
      <a href="javascript:;" class="fl large" :class="{disabled: page==total}" @click="next()">下一页</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cur: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      required: true,
    }
  },
  data(){
    return {
      page: this.cur
    }
  },
  methods: {
    prev(){
      if(this.page>1){
        this.page--;
      }
    },
    next(){
      if(this.page<this.total){
        this.page++;
      }
    }
  },
  watch: {
    page(){
      this.$emit('change', this.page);
    }
  }
}
</script>

<style lang="css" scoped>
.pagenation-container {text-align:center;}
.pagenation {
  display:inline-block;
  height:40px;padding-bottom:80px;
}
.pagenation a {
  padding:7px 12px;
  border:1px solid #e6e6e6;
  font-size:12px;line-height:24px;
  color:#333;
  margin-right:-1px;
}
.pagenation a.large {
  padding:8px 15px 6px 15px;
}
.pagenation a.active {
  background:#b4a078;
  border-color:#b4a078;
  color:#FFF;
}
.pagenation a.disabled,.pagenation a.disabled:hover {
  color:#CCC;
}
.pagenation a:hover {color:#b4a078}
</style>
