<template>
  <div id="app">
    <p>{{msg}}</p>
    <p>module {{aMsg}}</p>
    <button @click="setMsg">dispatch</button>
    <button @click="setModuleMsg">dispatch module</button>
    <button @click="directMsg">direct set</button>
  </div>
</template>

<script>


export default {
  name: 'App',
  computed: {
    msg() {

      return this.$store.state.msg || ''
    },
    aMsg() {

      return this.$store.state.a.msg || ''
    }


  },
  methods: {
    setMsg() {

      this.$store.dispatch('setMsg', 'hello vuex' + Math.random());
    },
    setModuleMsg() {

      this.$store.dispatch('a/setMsg', 'hello module' + Math.random());

    },
    directMsg() {

      this.$store.state.msg = 'direct msg' + Math.random();
    }

  }
}
</script>

<style>

</style>
