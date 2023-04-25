<script setup>
// import {RouterLink, RouterView} from 'vue-router'
import {useRouter} from '../../router';
// import {useRouter} from "vue-router";

import {useCounterStore} from "@/stores/counter";
import {useCounterOptionsStore} from "@/stores/counterOptions";

const router = useRouter();
const handleClick = (path) => router.push(path);

const counterStore = useCounterStore();

console.log('store', counterStore)

const counterOptionsStore = useCounterOptionsStore();


const handleClickOptionsCount = () => {

  counterOptionsStore.count++;
}

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
