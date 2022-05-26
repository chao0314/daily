<template lang="html">
  <div class="detail-imgs">
    <img  v-for="img in imgs" :src="img|imgPath" alt="">
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class Index extends Vue {
  @Prop({type:Array,default:()=>[]}) imgs!:string[];
}
</script>

<style scoped>
.detail-imgs {width:100%;padding-top:30px;}
.detail-imgs img {display:block;width:100%;}
</style>

<style lang="css">

</style>
