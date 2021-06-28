<template>
  <div class="w-collapse-item">
    <p class="w-collapse-item__header" @click="handleClick">{{ title }}</p>
    <transition v-on="transitionHandler">
      <div class="w-collapse-item__body" v-show="shouldShow">
        <slot></slot>
      </div>
    </transition>
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, inject} from 'vue'
import {CollapseProvide} from "./type";


export default defineComponent({
  name: "WCollapseItem",
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: () => Math.floor(Math.random() * 10000)

    },
    disabled: {
      type: Boolean,
      default: false

    }

  },
  setup(props) {

    const {activeNames, handleItemClick} = inject<CollapseProvide>('Collapse', {});

    const shouldShow = computed(() => activeNames.value.includes(props.name));
    const handleClick = () => !props.disabled && handleItemClick?.(props.name);

    const transitionHandler = {

      beforeEnter(el: HTMLElement) {
        console.log('before enter');
        el.classList.add('collapse-transition');
        el.style.height = 0;

      },

      enter(el: HTMLElement) {
        console.log('enter');
        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';

      },
      afterEnter(el) {
        console.log('after enter');
        el.classList.remove("collapse-transition");
      },
      beforeLeave(el: HTMLElement) {
        console.log('before leave');
        el.classList.add("collapse-transition");
      },
      leave(el: HTMLElement) {
        console.log('leave');
        el.style.height = 0;
      },
      afterLeave(el: HTMLElement) {
        console.log('after leave')
        el.classList.remove('collapse-transition');
      }


    }


    return {
      shouldShow,
      handleClick,
      transitionHandler
    }

  }

})
</script>

<style scoped>

</style>