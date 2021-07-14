<template>
  <div class="w-virtual-list" ref="containerRef" @scroll="handleScroll">
    <div class="w-virtual-list-scrollbar" ref="barRef"></div>
    <div class="w-virtual-list-content" :style=style>
      <div v-for="(item,index) in visibleItems" :key="index" :full_index="item._full_index"
           :ref="setItemRef">
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeMount, onBeforeUpdate,
  onMounted,
  onUpdated,
  provide,
  reactive,
  ref,
  toRefs
} from 'vue'
import {binSearchPositionIndex, throttle} from "../../utils";

export default defineComponent({
  name: "WVirtualList",
  props: {
    items: {
      type: Array,
      default: () => [{}]
    },
    itemHeight: {
      type: Number,
      default: 30
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
    const barRef = ref(null);
    const offsetTop = ref(0);
    const remainStart = computed(() => curStart.value > props.remain ? curStart.value - props.remain : 0);
    const remainEnd = computed(() => curEnd.value < props.items.length - props.remain ? curEnd.value + props.remain : props.items.length);
    const itemsWithIndex = computed(() => props.items.map((item: {}, index) => ({...item, _full_index: index})));

    const visibleItems = computed(() => itemsWithIndex.value.slice(remainStart.value, remainEnd.value));
    // content 最多 3 remain  远比 items scrollbar 小，所以当滚动后需要translate 下移，否则就是空白平
    //因为content 被卷进去了。而 动态更新 visibleItems 为的就是 渲染数据 下移 ，视觉上滚动
    const style = computed(() => ({transform: `translateY(${offsetTop.value}px)`}));
    let itemsRef = [];
    const setItemRef = el => props.variable && el && (itemsRef.push(el));


    let itemsPositions = [];


    provide('WVirtualList', {
      itemHeight: props.variable ? void 0 : props.itemHeight
    })

    onMounted(() => {

      containerRef.value.style.height = props.itemHeight * props.remain + 'px';

      if (props.itemHeight > 0 && !props.variable) {
        // item  固定高度
        barRef.value.style.height = props.itemHeight * props.items.length + 'px';

      } else {
        // item 高度不固定
        itemsPositions = updateItemsPositions(itemsPositions);
        barRef.value.style.height = (itemsPositions[itemsPositions.length - 1].bottom - itemsPositions[0].top) + 'px';

      }


    })

    onBeforeUpdate(() => itemsRef = []);

    onUpdated(() => {
      //更新 positions 以及 scrollbar 的长度
      nextTick(() => {

        itemsPositions = updateItemsPositions(itemsPositions);
        console.log(itemsPositions[itemsPositions.length - 1], itemsPositions[0])
        barRef.value.style.height = (itemsPositions[itemsPositions.length - 1].bottom - itemsPositions[0].top) + 'px';
      })
    })


    const updateItemsPositions = (itemsPositions = []) => {


      // 数据变了 重置
      if (itemsPositions.length !== itemsWithIndex.value.length) itemsPositions = [];

      if (itemsPositions.length === 0 && itemsRef.length > 0) {

        //预估的数值，用于滚动条高度
        itemsPositions = props.items.map((item, index) => ({
          index,
          top: props.itemHeight * index,
          bottom: props.itemHeight * (index + 1)
        }))

        itemsRef.forEach((item) => {

          const fullIndex = item.getAttribute('full_index');
          const {top, bottom} = item.getBoundingClientRect();
          itemsPositions[fullIndex].top = top;
          itemsPositions[fullIndex].bottom = bottom;

        })

      } else if (itemsRef.length > 0) {


        for (let i = 0; i < itemsRef.length; i++) {

          const item = itemsRef[i];

          const {top, bottom} = item.getBoundingClientRect();
          const fullIndex = Number(item.getAttribute('full_index'));
          const {top: oldTop, bottom: oldBottom} = itemsPositions[fullIndex];
          const diff = (bottom - top) - (oldBottom - oldTop);

          console.log('fullIndex--',fullIndex,);

          if (diff === 0) continue;

          for (let j = fullIndex + 1; j < itemsPositions.length; j++) {

            const position = itemsPositions[j];

            if (position) {
              position.top += diff;
              position.bottom += diff;
            }


          }


        }


      }

      return itemsPositions;


    }


    const handleScroll = throttle(() => {


      const scrollTop = containerRef.value.scrollTop;

      if (props.variable) {
        //item 高度不固定 二分查找 找到当前的 item
        // console.log("index", binSearchPositionIndex(itemsPositions, scrollTop))
        const curIndex = binSearchPositionIndex(itemsPositions, scrollTop);
        if (curIndex > 0) {

          curStart.value = curIndex;
          curEnd.value = curIndex + props.remain;

          const {top: diff} = itemsPositions[0];
          const {top: remainTop} = itemsPositions[remainStart.value];
          const {top: curTop} = itemsPositions[curIndex];
          // console.log("---", scrollTop, remainTop, curTop);
          offsetTop.value = scrollTop - (curTop + (scrollTop - (curTop - diff)) - remainTop);

        }


      } else {
        curStart.value = Math.floor(scrollTop / props.itemHeight);
        curEnd.value = curStart.value + props.remain;
        offsetTop.value = scrollTop - (curStart.value - remainStart.value) * props.itemHeight - scrollTop % props.itemHeight;

      }


    }, 30)


    return {
      visibleItems,
      containerRef,
      setItemRef,
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