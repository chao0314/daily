<template>
  <div>
    count:{{ count }}<br>
    one count :{{one}} <br>
    two count :{{two}} <br>
    three count :{{three}}
  </div>
  <button @click="clickHandler">click</button>

</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {useStore} from "../vuex-simple";

export default defineComponent({
  name: 'App',
  setup(props) {

    const store: any = useStore();
    console.log(store)
    const count = computed(() => store.state.count);
    const one = computed(() => store.state.one.count);
    const two = computed(() => store.state.two.count);
    const three = computed(() => store.state.one.three.count);
    const clickHandler = () => {
      console.log('click handler');
    }


    return {
      count,
      one,
      two,
      three,
      clickHandler

    }
  }


});
</script>

<style>

</style>
