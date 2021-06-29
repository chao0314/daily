<template>
  <div class="w-collapse">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, provide, watch} from 'vue'
import {CollapseProvide} from "./type";

export default defineComponent({
  name: "WCollapse",
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    accordion: {
      type: Boolean,
      default: false
    }

  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {
    const activeNames = computed(() => props.modelValue);
    const handleItemClick = (name:string) => {
      let names: string[] | number[];
      if (props.accordion) {

        if (activeNames.value.includes(name)) names = [];
        else names = [name];

      } else {
        if (activeNames.value.includes(name)) names = activeNames.value.filter(v => v !== name);
        else names = activeNames.value.concat(name);

      }
      // console.log(names)
      emit('update:modelValue', names);


    }


    provide<CollapseProvide>('Collapse', {
      activeNames,
      handleItemClick
    })


  }
})
</script>

<style scoped>

</style>