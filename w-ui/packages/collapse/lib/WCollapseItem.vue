<template>
  <div>
    <p>this is title</p>
    <div>
      <slot></slot>
    </div>

  </div>

</template>

<script lang="ts">
import {defineComponent} from 'vue'


export default defineComponent({
  name: "WCollapseItem",
})
</script>

<style scoped>

</style>