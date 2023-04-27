<script setup>
import {computed} from "vue";
// import {RouterLink, RouterView} from 'vue-router'
import {useRouter} from '../../router';
// import {useRouter} from "vue-router";

import {useStore} from "../../vuex";

import {useCounterStore} from "@/stores/counter";
import {useCounterOptionsStore} from "@/stores/counterOptions";

const router = useRouter();
const handleClick = (path) => router.push(path);

const counterStore = useCounterStore();


const counterOptionsStore = useCounterOptionsStore();


const handleClickOptionsCount = () => {

  counterOptionsStore.count++;
}


const store = useStore();

function add() {
  store.commit('add', 1)
}

function asyncAdd() {
  store.dispatch('asyncAdd', 1).then(() => {
    alert('ok')
  })
}

const count = computed(() => store.state.count);
const double = computed(() => store.getters.double);
const aCount = computed(() => store.state.aCount.count);
const bCount = computed(() => store.state.bCount.count);
const cCount = computed(() => store.state.aCount.cCount.count);


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125"/>

    <div class="wrapper">

      <nav>
        <!--        <RouterLink to="/">Home</RouterLink>-->
        <!--        <RouterLink to="/about">About</RouterLink>-->
        <button @click="handleClick('/')">home</button>
        <button @click="handleClick('/about/one')">about</button>
      </nav>
    </div>

    <div>
      <h2>pinia</h2>
      <h3>compositions api</h3>
      <p>{{ counterStore.count }}</p>
      <p>
        <button @click="counterStore.count++">button</button>
      </p>
      <p>{{ counterStore.doubleCount }}</p>
      <button @click="()=>counterStore.increment()">action</button>
      <h3>options api</h3>
      <p>{{ counterOptionsStore.count }}</p>
      <p>
        <button @click="handleClickOptionsCount">button</button>
      </p>
      <p>{{ counterOptionsStore.doubleCount }}</p>

      <button @click="()=>counterOptionsStore.increment()">action</button>

    </div>
  </header>
  <div>
    <h2>vuex</h2>
    计数器:{{ count }} {{ $store.state.count }}
    <button @click="$store.state.count++">错误修改</button>

    <hr/>
    double:{{ double }} {{ $store.getters.double }}

    <!-- 同步修改 -->
    <button @click="add">同步修改</button>
    <button @click="asyncAdd">异步修改</button>

    <hr/>
    a模块: {{ aCount }} {{ bCount }} {{ cCount }}

    <button @click="$store.commit('aCount/add', 1)">改a</button>
    <button @click="$store.commit('bCount/add', 1)">改b</button>
    <button @click="$store.commit('aCount/cCount/add', 1)">改c</button>
  </div>

  <RouterView/>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
