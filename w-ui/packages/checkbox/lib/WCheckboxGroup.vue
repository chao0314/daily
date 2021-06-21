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
    modelValue: {
      type: Array
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, {emit}) {

    const checkedValues = computed(() => props.modelValue);
    const handleChangeOrUpdate = value => {
      emit('change', value);
      emit('update:modelValue', value);

    }

    provide('CheckboxGroup', {
      flag: 'CheckboxGroup',
      checkedValues,
      handleChangeOrUpdate
    })


  }
})
</script>

<style scoped>

</style>