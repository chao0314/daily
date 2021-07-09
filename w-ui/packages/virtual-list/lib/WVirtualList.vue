<template>
  <div class="w-virtual-list">
    <div class="w-virtual-list-content"></div>
    <div class="w-virtual-list-scrollbar">
      <div v-for="(item,index) in items" :key="index">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "WVirtualList",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    size: {
      type: Number,
      default: 8
    },
    remain: {
      type: Number,
      default: 0
    },
    variable: {
      type: Boolean,
      default: false

    }
  },
  setup(props) {


    return {}
  }


})
</script>

<style scoped>
.w-virtual-list {
  overflow-y: scroll;
  position: relative;
}

.w-virtual-list-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

</style>