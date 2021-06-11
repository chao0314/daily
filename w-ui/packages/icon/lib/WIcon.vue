<template>
  <div>
    <i :class=clazz></i>
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, toRefs} from 'vue'

export default defineComponent({
  name: "WIcon",
  props: {
    name: String
  },
  setup(props, ctx) {
    const {name} = toRefs(props);
    const clazz = computed(() => `w-icon-${name.value}`);
    return {
      clazz
    }
  }


})
</script>

<style scoped>

</style>