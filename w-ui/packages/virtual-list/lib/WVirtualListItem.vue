<template>
  <div class="w-virtual-list-item">
    <slot :item="item">
      {{ item.id }} {{ item.value }}
    </slot>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "WVirtualListItem",
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
})
</script>

<style scoped>
.w-virtual-list-item {
  box-sizing: border-box;
}

</style>