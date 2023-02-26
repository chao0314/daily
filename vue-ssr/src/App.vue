<template>
  <div>
    <router-link to="/" exact>foo</router-link>
    <router-link to="/bar">bar</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import Foo from './conponents/Foo.vue'
import Bar from './conponents/Bar.vue'

export default {
  name: "App",
  components: {
    Foo,
    Bar
  }
}
</script>

<style scoped>

</style>