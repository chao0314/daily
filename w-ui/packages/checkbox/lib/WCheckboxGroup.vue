<template>
  <div class="w-checkbox-group">
    <slot></slot>
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, provide, watch} from 'vue'

export default defineComponent({
  name: "WCheckboxGroup",
  props: {
    modelValue: {
      type: Array
    },
    name: String
  },
  emits: ['update:modelValue', 'change'],
  setup(props, {emit}) {

    const checkedValues = computed(() => props.modelValue);
    
    const handleChangeOrUpdate = value => {
      emit('update:modelValue', value);
      emit('change', value);
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