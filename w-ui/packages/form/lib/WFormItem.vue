<template>
  <div class="w-form-item">
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <div class="w-form-item__error">
      验证失败
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject, onMounted, ref} from 'vue'

export default defineComponent({
  name: "WFormItem",
  props: {
    label: String,
    prop: String
  },
  setup(props) {
    const hasError = ref(false);
    const {rules, registerItem} = inject('WForm', {});
    const rule = computed(() => rules?.[props.prop]);

    const handleChange = () => {
      console.log('change')
    };
    const handleBlur = () => {
      console.log('blur')
    };
    const validate = () => {
    }

    const formItem = {
      ...toRefs(props),
      handleChange,
      handleBlur,
      validate

    }

    provide('WFormItem', formItem)

    onMounted(() => {
      registerItem(formItem);
    });

    return {
      hasError

    }


  }


})
</script>

<style scoped>

</style>