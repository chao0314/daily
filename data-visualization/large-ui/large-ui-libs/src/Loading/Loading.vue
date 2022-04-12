<template>
  <div class="loading">

    <!-- transform-origin 设置 origin -->
    <!--  可以在 from to 设置  from="0 25 25"  to="360 25 25"   -->
    <!-- 也可以在 values 同时设置 from to  origin 三个值     -->
    <svg :width="width" :height="height" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">

      <circle cx="25" cy=25 :r="outR" fill="none" :stroke="outsideColor"
              stroke-width="3" :stroke-dasharray="outDash" stroke-linecap="round"
              transform-origin="25 25"
      >
        <animateTransform attributeName="transform" attributeType="xml" type="rotate"
                          from="0" to="360" :dur="duration" repeatCount="indefinite"
        ></animateTransform>
        <animate attributeName="stroke" attributeType="xml" :dur="duration" repeatCount="indefinite"
                 :values="outAnimationColor"
        ></animate>

      </circle>

      <circle cx="25" cy="25" :r="inR" fill="none" :stroke="insideColor"
              stroke-width="3" :stroke-dasharray="inDash" stroke-linecap="round"
      >
        <animateTransform attributeName="transform" attributeType="xml" type="rotate"
                          from="360 25 25" to="0 25 25" :dur="duration" repeatCount="indefinite"
        ></animateTransform>


        <animate attributeName="stroke" attributeType="xml" :dur="duration" repeatCount="indefinite"
                 :values="inAnimationColor"
        ></animate>

      </circle>

      <circle cx="25" cy="25" :r="6" fill="none" stroke="pink"
              stroke-width="3" :stroke-dasharray="inDash/2" stroke-linecap="round"
      >
        <animateTransform attributeName="transform" attributeType="xml" type="rotate"
                          values="0 25 25;360 25 25" :dur="duration" repeatCount="indefinite"
        ></animateTransform>

      </circle>
    </svg>
    <div class="loading__title">
      <slot>
        <p>{{ title }}</p>
      </slot>
    </div>
  </div>
</template>

<script>
import {computed} from 'vue';

export default {
  name: "Loading",
  props: {
    width: {
      type: [Number, String],
      default: 200
    },
    height: {
      type: [Number, String],
      default: 200

    },
    outsideColor: {

      type: String,
      default: '#3be6cb'
    },
    insideColor: {
      type: String,
      default: '#02bcfe'
    },
    duration: {
      type: [Number, String],
      default: 2
    },
    title: {

      type: String,
      default: '加载中...'
    }


  },
  setup(props, ctx) {

    const outR = 22;
    const inR = 12;
    const outDash = Math.PI * 2 * outR / 4;
    const inDash = Math.PI * 2 * inR / 4
    const outAnimationColor = computed(() => `${props.outsideColor};${props.insideColor};${props.outsideColor}`);
    const inAnimationColor = computed(() => `${props.insideColor};${props.outsideColor};${props.insideColor}`);


    return {
      outDash,
      inDash,
      outR, inR,
      inAnimationColor,
      outAnimationColor,
    }

  }


}
</script>

<style scoped>

.loading {
  text-align: center;

}


</style>