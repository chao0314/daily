<template>
  <div id="nav">
    <!--    <router-link to="/">Home</router-link>-->
    <!--    <router-link to="/about">About</router-link>-->

    <router-link to="/user/1">user1</router-link>
    <router-link to="/user/2">user2</router-link>

    <button @click="clickHandle"> test sentry</button>
  </div>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  methods: {
    clickHandle() {

      console.log("123")
      console.log(window.a.b)
    }

  }
}

</script>

<style>
</style>
