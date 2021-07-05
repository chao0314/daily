<template>
  <form class="z-form">
    <slot></slot>
  </form>

</template>

<script lang="ts">
import {defineComponent, PropType, provide, toRefs} from 'vue'

type Rules = { [K: string]: [] };

export default defineComponent({
  name: "WFrom",
  props: {
    model: Object,
    rules: Object as PropType<Rules>
  },
  emits: ['validate'],
  setup(props) {
    const formItems = new Set();
    const registerItem = (formItem) => formItems.add(formItem);

    provide('WFrom', {
      ...toRefs(props),
      registerItem
    })


  }


})
</script>

<style scoped>

</style>