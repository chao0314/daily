<template>
  <div class="w-virtual-list" ref="containerRef" @scroll="handleScroll">
    <div class="w-virtual-list-scrollbar" ref="barRef"></div>
    <div class="w-virtual-list-content" :style=style>
      <div v-for="(item,index) in visibleItems" :key="index" ref="itemsRef">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, provide, reactive, ref, toRefs} from 'vue'
import {throttle} from "../../utils";

export default defineComponent({
  name: "WVirtualList",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    itemHeight: {
      type: Number,
      default: 0
    },
    remain: {//前 中 后可见多少个 三倍
      type: Number,
      default: 8
    },
    variable: {
      type: Boolean,
      default: false

    }
  },
  setup(props) {
    const curStart = ref(0);
    const curEnd = ref(props.remain);
    const containerRef = ref(null);
    const itemsRef = ref(null);
    const barRef = ref(null);
    const offsetTop = ref(0);
    let remainStart, remainEnd;


    const visibleItems = computed(() => {

      if (curStart.value > props.remain) remainStart = curStart.value - props.remain;
      else remainStart = 0;
      if (curEnd.value < props.items.length - props.remain) remainEnd = curEnd.value + props.remain;
      else remainEnd = props.items.length;
      console.log(remainStart, remainEnd)
      return props.items.slice(remainStart, remainEnd);


    })

    const style = computed(() => ({transform: `translateY(${offsetTop.value}px)`}));


    provide('WVirtualList', {
      itemHeight: props.itemHeight
    })

    onMounted(() => {

      if (props.itemHeight > 0 && !props.variable) {
        // item  固定高度
        barRef.value.style.height = props.itemHeight * props.items.length + 'px';
        containerRef.value.style.height = props.itemHeight * props.remain + 'px';

      } else {
        // item 高度不固定


      }


    })

    const handleScroll = throttle(() => {

      console.log(containerRef.value.scrollTop)

      const scrollTop = containerRef.value.scrollTop;

      if (props.variable) {
        //item 高度不固定


      } else {

        curStart.value = Math.floor(scrollTop / props.itemHeight);
        curEnd.value = curStart.value + props.remain;
        offsetTop.value = scrollTop - remainStart * props.itemHeight - scrollTop % props.itemHeight;

      }


    }, 200)


    return {
      visibleItems,
      containerRef,
      itemsRef,
      barRef,
      handleScroll,
      offsetTop,
      style
    }
  }


})
</script>

<style scoped>
.w-virtual-list {
  overflow-y: scroll;
  position: relative;
  border: 1px solid goldenrod;
  word-wrap: break-word;
}

.w-virtual-list-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

</style>