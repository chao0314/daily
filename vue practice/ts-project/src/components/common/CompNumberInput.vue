<template lang="html">
  <div class="count-input">
    <a href="#" class="op">-</a>
    <input type="text" class="number" value="1" />
    <a href="#" class="op">+</a>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Index extends Vue {

}
</script>

<style scoped>
.count-input {}
.count-input .op {float:left;width:26px;height:26px;background:#ededed;color:#333;border:1px solid #ccc;text-align:center;line-height:26px;font-size:26px;}
.count-input .number {float:left;width:50px;height:26px;border:1px solid #ccc;border-right:none;border-left:none;padding:0;text-align:center;font-size:16px;}
</style>

<style lang="css">

</style>
