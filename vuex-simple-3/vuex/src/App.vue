<template>
  计数器:{{ count }} {{ $store.state.count }}
  <button @click="$store.state.count++">错误修改</button>

  <hr/>
  double:{{ double }} {{ $store.getters.double }}
  <hr>

  <!-- 同步修改 -->
  <button @click="add">同步修改</button>
  <button @click="asyncAdd">异步修改</button>

  <hr/>
  a模块: {{ aCount }} b模块:{{ bCount }} c模块:{{ cCount }}

  <button @click="$store.commit('aCount/add', 1)">改a模块</button>
  <button @click="$store.commit('bCount/add', 1)">改b模块</button>
  <button @click="$store.commit('aCount/cCount/add', 1)">改c模块</button>
</template>
<script>
import {computed, toRefs} from 'vue'
import {useStore} from '../vuex-simple/index';

export default {
  name: 'App',
  setup() { // vue3 有个compositionApi的入口
    const store = useStore();

    console.log(store)

    function add() {
      store.commit('add', 1)
    }

    function asyncAdd() {
      store.dispatch('asyncAdd', 1).then(() => {
        alert('ok')
      })
    }

    // const t =  computed(() => store.getters.double);
    // console.log("store getters----------",store.getters,store.getters.double)
    return {
      count: computed(() => store.state.count),
      double: computed(() => store.getters.double),
      aCount: computed(() => store.state.aCount.count),
      bCount: computed(() => store.state.bCount.count),
      cCount: computed(() => store.state.aCount.cCount.count),
      add,
      asyncAdd
    }
  }

}
</script>


