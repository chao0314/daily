<template lang="html">
  <!-- <div class="magnifier magnifier-show fl"> -->
  <div class="magnifier fl">
    <div class="magnifier-big">
      <span class="mask"></span>
      <img class="img-big" src="../../assets/imgs/O1CN01jPlEEU2MyPzSQTxH5_0-item_pic.jpg_400x400.jpg" alt="">
      <div class="magnifier-org">
        <img class="img-org" src="../../assets/imgs/O1CN01jPlEEU2MyPzSQTxH5_0-item_pic.jpg" alt="">
      </div>
    </div>
    <ul class="magnifier-list">
      <li class="list-item active">
        <img class="img-small" src="../../assets/imgs/O1CN01jPlEEU2MyPzSQTxH5_0-item_pic.jpg_50x50.jpg_.webp" alt="">
      </li>
      <li class="list-item">
        <img class="img-small" src="../../assets/imgs/O1CN01jPlEEU2MyPzSQTxH5_0-item_pic.jpg_50x50.jpg_.webp" alt="">
      </li>
      <li class="list-item">
        <img class="img-small" src="../../assets/imgs/O1CN01jPlEEU2MyPzSQTxH5_0-item_pic.jpg_50x50.jpg_.webp" alt="">
      </li>
      <li class="list-item">
        <img class="img-small" src="../../assets/imgs/O1CN01jPlEEU2MyPzSQTxH5_0-item_pic.jpg_50x50.jpg_.webp" alt="">
      </li>
      <li class="list-item">
        <img class="img-small" src="../../assets/imgs/O1CN01jPlEEU2MyPzSQTxH5_0-item_pic.jpg_50x50.jpg_.webp" alt="">
      </li>
      <li class="list-item">
        <img class="img-small" src="../../assets/imgs/O1CN01jPlEEU2MyPzSQTxH5_0-item_pic.jpg_50x50.jpg_.webp" alt="">
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Index extends Vue {

}
</script>

<style scoped>
/*  */
.magnifier {
  padding:20px;padding-right:0;
  width:400px;height:469px;
}
.magnifier-big {width:400px;height:400px;position:relative;}
.magnifier-big .img-big {}
.magnifier-big .mask {width:133px;height:133px;background:url(../../assets/imgs/mask.png) repeat;position:absolute;left:0;top:0;display:none;}
.magnifier-org {position:absolute;left:420px;top:0;width:400px;height:400px;overflow:hidden;display:none;}
.magnifier-org .img-org {position:absolute;left:0;top:0;}

.magnifier-org {}
.magnifier-org .img-org {}

.magnifier-list {}
.magnifier-list .list-item {}
.magnifier-list .img-small {}

.magnifier-show .mask {display:block;}
.magnifier-show .magnifier-org {display:block;}

.magnifier-list {width:400px;height:54px;margin-top:15px;}
.magnifier-list .list-item {width:50px;height:50px;border:2px solid #FFF;margin-right:9px;float:left;}
.magnifier-list .img-small {}
.magnifier-list .active {border-color:#F40;}
</style>

<style lang="css">

</style>
