<template lang="html">
  <div class="number-input fl">
    <a href="#" class="btn btn-plus fl" @click="val--" :class="{'btn-disabled': val<=min}">-</a>
    <input type="text" class="number fl" v-model="val" maxlength="8" />
    <a href="#" class="btn btn-minus fl" @click="val++" :class="{'btn-disabled': val>=max}">+</a>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    }
  },
  data(){
    return {
      valinner: this.value
    }
  },
  computed: {
    val: {
      get(){
        return this.valinner;
      },
      set(val){
        if(val<this.min){
          val=this.min;
        }else if(val>this.max){
          val=this.max;
        }

        this.valinner=val;
      }
    }
  }
}
</script>

<style lang="css" scoped>
.number-input {
  display:inline-block;
  width:132px;height:30px;
  border:1px solid #ddd;
}
.number-input .btn {
  width:35px;height:30px;line-height:30px;
  border-right:1px solid #ddd;
  text-align:center;
  font-size:18px;font-weight:700;
  color:#666;
}
.number-input .btn-minus {border-right:none;border-left:1px solid #ddd;}
.number-input .btn-disabled {color:#CCC;cursor:not-allowed;}
.number-input .number {width:60px;text-align:center;height:30px;font-size:12px;}
</style>
