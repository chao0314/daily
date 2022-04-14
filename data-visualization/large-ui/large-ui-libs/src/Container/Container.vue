<template>
  <div class="container" ref="containerRef" :style="{width: widthRef+'px',height: heightRef+'px'}">
    <slot>container</slot>
  </div>
</template>

<script>
import {ref, onMounted, onUnmounted} from 'vue';

export default {
  name: "Container",
  props: {
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    }
  },

  setup(props, ctx) {

    let defWidth = props.width;
    let defHeight = props.height;
    const containerRef = ref(null);
    const widthRef = ref(defWidth);
    const heightRef = ref(defHeight);
    const handleResize = () => {

      const curWidth = document.documentElement.clientWidth;
      const curHeight = document.documentElement.clientHeight;
      updateScale(curWidth, curHeight);

    }

    const updateScale = (curWidth, curHeight) => {

      const wScale = curWidth / defWidth;
      const hScale = curHeight / defHeight;
      containerRef.value && (containerRef.value.style.transform = `scale(${wScale},${hScale})`);

    }

    onMounted(() => {

      const realWidth = document.documentElement.clientWidth;
      const realHeight = document.documentElement.clientHeight;

      if (!defWidth || !defHeight) {
        defWidth = widthRef.value = realWidth;
        defHeight = heightRef.value = realHeight;
      }


      handleResize();

      window.addEventListener('resize', handleResize)

    })

    onUnmounted(() => {

      window.removeEventListener('resize', handleResize);
    })

    return {
      containerRef,
      widthRef, heightRef,

    }
  }
}
</script>

<style scoped>
.container {
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  transform-origin: left top;
}

</style>