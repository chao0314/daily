<template>
  <div class="fly-box" ref="flyBoxRef">
    <svg class="fly-box__bg" :width="widthRef" :height="heightRef">
      <defs>
        <path :id="pathID" :d="pathDescription" fill="none"></path>
        <!-- cx cy 渐变范围的圆心  fx fy 光源的圆心    stop的offset 是相当于 fx fy   -->

        <radialGradient :id="radialGradientID" cx="50%" cy="50%" fx="100%" fy="50%" r="50%">

          <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
          <!--      mask 里的的 fff 白色 底层覆盖元素可见 渐变以后，逐渐就不可见了    -->
          <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>

        </radialGradient>

        <mask :id="maskID">
          <!--svg  mask 越接近 填充 白色 越 接近透明，可以透过 mask 看到被其覆盖的元素，近似开了一个在窗户-->
          <circle :fill="`url(#${radialGradientID})`" cx="0" cy="0" :r="startLength">
            <animateMotion
                :path="pathDescription"
                :dur="`${duration}s`"
                rotate="auto"
                repeatCount="indefinite"
            ></animateMotion>
          </circle>

        </mask>
      </defs>

      <use :href="`#${pathID}`" :stroke="lineColor" stroke-width="1"></use>
      <use :href="`#${pathID}`" :stroke="startColor" stroke-width="3" :mask="`url(#${maskID})`"></use>
    </svg>
    <div class="fly-box__content">
      <slot>
        slot
      </slot>
    </div>
  </div>
</template>

<script>
import {ref, onMounted, computed} from 'vue';
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
    const pathID = v4();
    const radialGradientID = v4();
    const maskID = v4();

    onMounted(() => {
      const oContent = flyBoxRef.value;
      widthRef.value = oContent.clientWidth;
      heightRef.value = oContent.clientHeight;
    })


    const pathDescription = computed(() =>
        `M 5 5 L ${widthRef.value - 5} 5 L ${widthRef.value - 5} ${heightRef.value - 5} L 5 ${heightRef.value - 5} Z`)


    return {
      flyBoxRef,
      widthRef,
      heightRef,
      pathID, radialGradientID, maskID,
      pathDescription
    }

  }
}
</script>

<style scoped>

.fly-box {
  position: relative;
  width: 100%;
  height: 100%;
}

.fly-box__content {
  position: absolute;
  left: 10px;
  right: 10px;
  top: 10px;
  bottom: 10px;
}

</style>