<template>
  <div>
    <button @click="handleClick">switch</button>
    <transition name="t" appear mode="out-in">
      <p v-if="shouldShow">show or hidden</p>
      <p v-else> hidden or show</p>
    </transition>
    <br>
    <!--    <transition name="s">-->
    <!--      <p class="scale" v-if="shouldShow">scale</p>-->
    <!--    </transition>-->
  </div>
  <hr>
  <transition name="ani">
    <p v-if="shouldShow">animate.css</p>
  </transition>
  <!--  <animation></animation>-->
  <hr>
  <button @click="addNum">add+</button>
  <input type="number" step="100" :value="numRef.toFixed(0)">
  <br>
  <br>
  <button @click="addHandler">add</button>
  <button @click="removeHandler">remove</button>
  <button @click="shuffleHandler">shuffle</button>
  <transition-group name="list">
    <p v-for="(value,index) of nums" :key="value" class="list-p">{{ value }}</p>
  </transition-group>
</template>

<script>
import {ref, computed} from "vue";
import Animation from "@/components/Animation";
import {gsap} from "gsap";
import {shuffle} from 'lodash';

export default {
  name: 'App',
  components: {
    Animation
  },
  setup(props, ctx) {
    const shouldShow = ref(true);

    const handleClick = () => {
      shouldShow.value = !shouldShow.value;
    }

    const numRef = ref(0);
    const addNum = () => {
      gsap.to(numRef, {
        duration: 1,
        value: numRef.value + 100

      })
    }

    const addHandler = () => {
      const index = Math.floor(Math.random() * nums.value.length);
      const value = Math.floor(Math.random() * 100);
      nums.value.splice(index, 0, value);
    }

    const removeHandler = () => {
      const index = Math.floor(Math.random() * nums.value.length);
      console.log(index)
      nums.value.splice(index, 1);
    }

    const shuffleHandler = () => {

      nums.value = shuffle(nums.value)
    }
    const nums = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
    return {
      shouldShow,
      handleClick,
      numRef,
      addNum,
      nums,
      addHandler, removeHandler, shuffleHandler
    }
  }
}
</script>

<style scoped>

.t-enter-from {

  opacity: 0;

}

.t-enter-active {

  transition: opacity 2s ease;
}

.t-enter-to {

  opacity: 1;
}

.t-leave-from {

  opacity: 1;
}

.t-leave-active {

  transition: opacity 2s ease;
}

.t-leave-to {

  opacity: 0;
}

.scale {
  width: 100px;
  height: 100px;
  background: pink;
  margin: 0 auto;
}

.s-enter-active {
  animation: scale-p 1s ease;
}

.s-leave-active {
  animation: scale-p 1s ease reverse;
}

@keyframes scale-p {

  0% {

    transform: scale(0);

  }
  50% {
    transform: scale(1.2);
  }


  100% {
    transform: scale(1);
  }
}

.ani-enter-active {
  animation: bounce 1s;
}

.ani-leave-active {
  animation: bounce 1s;
}

.list-p {
  display: inline-block;
  margin: 0 5px;
}

.list-enter-from, .list-leave-to {

  transform: translateY(30px);
  opacity: 0;
}

.list-enter-active, .list-leave-active {

  transition: all 1s ease;

}

.list-move {
  transition: all 1s ease;
}
.list-leave-active{
  position: absolute;
}



</style>
