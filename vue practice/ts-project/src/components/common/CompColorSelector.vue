<template lang="html">
  <ul class="color-select">
    <li class="active"><img src="imgs/TB2R8UCn5CYBuNkSnaVXXcMsVXa_!!753939896.jpg_30x30.jpg" alt=""></li>
    <li><img src="imgs/TB2R8UCn5CYBuNkSnaVXXcMsVXa_!!753939896.jpg_30x30.jpg" alt=""></li>
    <li><img src="imgs/TB2R8UCn5CYBuNkSnaVXXcMsVXa_!!753939896.jpg_30x30.jpg" alt=""></li>
    <li><img src="imgs/TB2R8UCn5CYBuNkSnaVXXcMsVXa_!!753939896.jpg_30x30.jpg" alt=""></li>
    <li><img src="imgs/TB2R8UCn5CYBuNkSnaVXXcMsVXa_!!753939896.jpg_30x30.jpg" alt=""></li>
    <li><img src="imgs/TB2R8UCn5CYBuNkSnaVXXcMsVXa_!!753939896.jpg_30x30.jpg" alt=""></li>
  </ul>
</template>

<script lang="ts">

import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class ColorSelector extends Vue {

}
</script>

<style scoped>
.color-select {overflow:hidden;}
.color-select li {float:left;width:30px;height:30px;margin-right:5px;margin-bottom:10px;border:1px solid #DCDCDC;padding:2px;}
.color-select li.active {border:2px solid #F40;padding:1px;}
</style>

<style lang="css">

</style>
