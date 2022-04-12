<template>
  <div class="container">
    <l-Loading></l-Loading>
    <l-fly-box class="l-fly-box">
      <div>content</div>
    </l-fly-box>
  </div>

</template>

<script>
import {ref} from "vue";

export default {
  name: 'App',
  components: {},
  setup() {


    return {}

  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html, body {

  height: 100%;
}

#app {

  height: 100%;
}
</style>
<style scoped>

.container {
  width: 100%;
  height: 100%;
  display: flex;
  /*align-items: center;*/
  flex-direction: column;

}

.l-fly-box {
  width: 500px;
  height: 100px;
  background: red;
  margin: 0 auto;
}


</style>
