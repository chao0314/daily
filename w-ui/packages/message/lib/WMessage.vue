<template>
  <transition name="message">
    <div :class=clazz :style="styles" v-show="shouldShow">
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, reactive, ref} from 'vue'

type MessageType = "primary" | "warning" | "danger" | "default" | "info" | "success"
export default defineComponent({
  name: "WMessage",
  props: {
    message: {
      type: String,
      default: "default message"

    },
    type: {
      type: String as PropType<MessageType>,
      default: 'info'
    },
    offset: {
      type: Number,
      default: 0

    }


  },
  setup(props) {


    const styles = computed(() => ({

      top: props.offset * 60 + 'px'
    }))
    const clazz = computed(() => `w-message w-message--${props.type}`);

    const shouldShow = ref(false);

    onMounted(() => {
      shouldShow.value = true;

    });


    return {
      styles,
      clazz,
      shouldShow
    }


  }


})
</script>

<style scoped>


</style>