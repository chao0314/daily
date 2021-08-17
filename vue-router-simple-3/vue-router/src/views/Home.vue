<template>
  <div class="home">
    首页
    <hr />

    <router-link to="/one">one页面</router-link>
    <br>
    <router-link to="/two">two页面</router-link>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'Home',
  // beforeRouteEnter(to, from, next) {
  //   console.log('beforeRouterEnter', to)
  // },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('beforeRouteUpdate', to)
  // },
  // beforeRouteLeave(to, from, next) {
  //   console.log('beforeRouteLeave', to)
  //
  //
  // },
  // mounted() {
  //   console.log(this.$router);
  //   console.log(this.$route);
  // },
}
// a leave  
// b beforeEach
// b beforeEnter
// b beforeRouterEnter
// b resolve
// afterEach
</script>
