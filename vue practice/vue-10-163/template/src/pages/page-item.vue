<template lang="html">
  <div class="detail-bg">
    <div class="page">
      <cmpCrumbs :pathArr="[]"/>
      <cmpHeader/>
      <div class="detail-prompt"></div>
      <div class="detail-content clearfix">
        <cmpContent/>
        <cmpHot/>
      </div>
    </div>
  </div>
</template>

<script>
import cmpCrumbs from '@/components/common/cmp-crumbs';
import cmpHeader from '@/components/item/cmp-header';
import cmpContent from '@/components/item/cmp-content';
import cmpHot from '@/components/item/cmp-hot';

export default {
  components: {
    cmpCrumbs, cmpHeader, cmpContent, cmpHot
  }
}
</script>

<style lang="css" scoped>
.detail-bg {
  background:#FFF;
  border-top:1px solid #ebebeb;
}



/*  */
.detail-prompt {}

/*  */
.detail-content {width:1090px;margin-top:30px;}
</style>
