<template>
  <button :class="clazz" @click="clickHandler">
    <i v-if="loading" class="w-icon-loading"></i>
    <i v-else-if="iconName" :class="iconName"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>

</template>

<script lang="ts">
import {computed, defineComponent, PropType, toRefs} from 'vue'

type ButtonType = "primary" | "warning" | "danger" | "default" | "info" | "success";
export default defineComponent({
  name: "WButton",
  props: {
    loading: Boolean,
    disabled: Boolean,
    round: Boolean,
    icon: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<ButtonType>,
      default: "default",
      validator: (type: ButtonType) => ["primary", "warning", "danger", "default", "info", "success"].includes(type)

    },


  },
  emits: ['click'],
  setup(props, {emit}) {


    const clazz = computed(() => [
      "w-button",
      "w-button--" + props.type,
      {
        "is-disabled": props.disabled,
        "is-loading": props.loading,
        "is-round": props.round
      }
    ])

    const iconName = computed(() => `w-icon-${props.icon}`);

    const clickHandler = (e) => {
      // console.log('button click inner');
      emit('click', e);
    }

    return {
      clickHandler,
      clazz,
      iconName
    }


  }
})
</script>

<style scoped>

</style>