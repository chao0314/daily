<template>
  <div class="w-checkbox-group">
    <slot></slot>
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, provide} from 'vue'

export default defineComponent({
  name: "WCheckboxGroup",
  props: {
    modeValue: {
      type: Array,
      required: true
    }
  },
  emits: ['update:modeValue', 'change'],
  setup(props, {emit}) {

    const checkboxValues = computed(() => props.modeValue);
    const handleChangeOrUpdate = value => {
      emit('change', value);
      emit('update:modeValue', value);

    }

    provide('CheckboxGroup', {
      flag: 'CheckboxGroup',
      checkboxValues,
      handleChangeOrUpdate
    })


  }
})
</script>

<style scoped>

</style>