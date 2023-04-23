<script setup>

import {useRouter} from '../../../router';
// import {useRouter} from "vue-router";

const router = useRouter();
const handleClick = (path) => router.push(path);

</script>
<template>
  <div class="about">
    <h1>This is an about page</h1>

    <button @click="handleClick('/about/one')">one</button>
    <button @click="handleClick('/about/two')">two</button>
    <router-view></router-view>
  </div>
</template>

<style>

</style>
