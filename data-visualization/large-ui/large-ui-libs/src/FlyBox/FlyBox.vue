<template>
  <div class="fly-box" ref="flyBoxRef">
    <svg class="fly-box__bg" :width="widthRef" :height="heightRef" >
      <path></path>
    </svg>
    <div class="fly-box__content">
      <slot>
        slot
      </slot>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, computed, watch} from 'vue';
import {v4} from 'uuid';

export default {
  name: "FlyBox",
  props: {
    duration: {
      require: [Number, String],
      default: 3
    },
    lineColor: {
      require: String,
      default: '#235fa7'
    },
    startLength: {
      require: [Number, String],
      default: 50
    },
    startColor: {
      require: String,
      default: '#4fd2dd'
    }

  },
  setup(props, ctx) {

    const flyBoxRef = ref(null);
    const widthRef = ref(0);
    const heightRef = ref(0);

    onMounted(() => {
      const oContent = flyBoxRef.value;
      widthRef.value = oContent.clientWidth;
      heightRef.value = oContent.clientHeight;
      console.log(v4())
    })


    return {
      flyBoxRef,
      widthRef,
      heightRef
    }

  }
}
</script>

<style scoped>

.fly-box {
  position: relative;

}

.fly-box__content {
  position: absolute;
  left: 0;
  top: 0;
}

</style>