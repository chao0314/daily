<template>
  <transition name="message" @after-leave="handleLeave">
    <div :class=clazz :style="styles" v-show="shouldShow">
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, onUnmounted, onUpdated, PropType, reactive, ref, watch} from 'vue'

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

    },
    duration: {
      type: Number,
      default: 3000
    },
    handleClosed: {
      type: Function as PropType<(el: HTMLElement) => void>
    }


  },
  setup(props) {

    // watch(() => props.offset, () => console.log('offset change'));


    const shouldRemove = ref(true);
    const style = reactive({top: props.offset * 60 + 'px'});
    const styles = computed(() => {

      return {
        top: props.offset * 60 + 'px',
        ...style
      }
    })
    const clazz = computed(() => `w-message w-message--${props.type}`);

    const shouldShow = ref(false);
    const handleLeave = (el) => {

      props.handleClosed?.(el);
      shouldRemove.value = false;

    }
    let timer;

    onMounted(() => {
      console.log("mounted")
      shouldShow.value = true;
      timer = setTimeout(() => {
        shouldShow.value = false;
        timer = null;
      }, props.duration);
    });
    onUnmounted(() => {
      console.log('unmounted')
      if (timer) clearTimeout(timer);
    });

    const setOffset = (offset: number) => style.top = offset * 60 + 'px';

    const test = ref('hi hi');
    onUpdated(() => console.log('updated'));

    setTimeout(() => {

      test.value = 'ha ha ha';
    }, 2000)

    return {
      styles,
      clazz,
      shouldShow,
      handleLeave,
      shouldRemove,
      setOffset
    }


  }


})
</script>

<style scoped>


</style>