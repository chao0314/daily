<template>
  <div class="w-virtual-list-item" :style="style">
  <slot></slot>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject} from 'vue'

export default defineComponent({
  name: "WVirtualListItem",
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },

  setup(props) {

    const {itemHeight} = inject('WVirtualList', {} as any);
    const style = computed(() => {

      return {
        "height": itemHeight + 'px'
      }
    })
    // console.log(props.item)

    return {
      style
    }

  }
})


</script>

<style scoped>
.w-virtual-list-item {
  box-sizing: border-box;
  background: pink;
  border: 1px solid silver;
}

</style>