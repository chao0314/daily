<template>
  <div class="w-collapse-item">
    <p class="w-collapse-item__header" @click="handleClick">{{ title }}</p>
    <transition v-on="transitionHandler">

      <div class="w-collapse-item__wrap" v-show="shouldShow">
        <div class="el-collapse-item__content">
          <slot></slot>
        </div>
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
      type: String,
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

      beforeEnter(el) {
        el.classList.add('collapse-transition');
        el.dataset ??= {};
        const style = getComputedStyle(el);
        el.dataset.paddingTop = style.paddingTop;
        el.dataset.paddingBottom = style.paddingBottom;
        el.dataset.overflow = style.overflow;

        //设置动画开始 状态
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      },

      enter(el) {
        //动画没结束 offsetHeight clientHeight 均为0，只有 scrollHeight 可用
        const scrollHeight = el.scrollHeight;
        const {paddingTop, paddingBottom} = el.dataset;
        if (scrollHeight > 0) el.style.height = scrollHeight + 'px';
        //自适应
        else el.style.height = '';
        el.style.overflow = 'hidden';
        el.style.paddingTop = paddingTop;
        el.style.paddingBottom = paddingBottom;

      },
      afterEnter(el) {
        // for safari: remove class then reset height is necessary
        el.classList.remove("collapse-transition");
        const {overflow} = el.dataset;
        //动画结束后恢复
        // 自适应
        el.style.height = '';
        el.style.overflow = overflow;
      },
      beforeLeave(el) {
        el.dataset ??= {};
        const style = getComputedStyle(el);
        el.dataset.overflow = style.overflow;
        el.dataset.paddingTop = style.paddingTop;
        el.dataset.paddingBottom = style.paddingBottom;

        //设置动画开始状态
        //之前设置了 自适应
        //应对浏览器 差异
        el.style.overflow = 'hidden';
        el.style.height = el.scrollHeight + 'px';


      },
      leave(el) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        el.classList.add("collapse-transition");
        // fix #968 collapse animation failure.
        // in vue3.0.4, transitionProperty is set 'none' to avoid 'v-leave-from' issue
        el.style.transitionProperty = 'height'
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;


      },
      afterLeave(el) {

        el.classList.remove('collapse-transition');

        const {paddingTop, paddingBottom, overflow} = el.dataset

        el.style.height = '';
        el.style.overflow = overflow;
        el.style.paddingTop = paddingTop;
        el.style.paddingBottom = paddingBottom;

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