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
  <br><br>
  <input type="text" v-model="searchTextRef">
  <transition-group tag="ul"
                    :class="false"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @leave="leave"
  >
    <li v-for="(item,index) of listRef" :key="item.msg" :data-index="index">{{ item.msg }}</li>
  </transition-group>

</template>

<script>
import {ref, computed, watch} from "vue";
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
    const nums = ref([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const list = [
      {msg: 'Bruce Lee'},
      {msg: 'Jackie Chan'},
      {msg: 'Chuck Norris'},
      {msg: 'Jet Li'},
      {msg: 'Kung Fury'}
    ];

    const listRef = ref(list);


    const searchTextRef = ref('')

    watch(searchTextRef, (newVal, oldVal) => {

      if (!newVal) listRef.value = list;
      else if (newVal !== oldVal) {
        newVal = newVal.toLocaleLowerCase();
        listRef.value = listRef.value.filter(item => item.msg.toLowerCase().includes(newVal));
      }

    })

    const beforeEnter = (el, done) => {

      console.log('before')

      el.style.opacity = 0;
      el.style.height = 0;
    }
    const enter = (el, done) => {
      console.log('enter')
      gsap.to(el, {

        opacity: 1,
        height: '1.5em',
        delay: 0.15 * el.dataset.index,
        onComplete: done
      })
    }
    const leave = (el, done) => {
      console.log('leave')
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: 0.15 * el.dataset.index,
        onComplete: done
      })
    }
    return {
      shouldShow,
      handleClick,
      numRef,
      addNum,
      nums,
      addHandler, removeHandler, shuffleHandler,
      listRef, searchTextRef,
      beforeEnter, enter, leave
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

.list-leave-active {
  position: absolute;
}


</style>
