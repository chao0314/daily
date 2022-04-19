<template>
  <div class="screen-home">
    <l-loading v-if="isLoading" class="loading">
      <p class="loading-title">
        加载中...
      </p>
    </l-loading>

    <!--    <l-logo v-if="isLoading" stroke="red" strokeWidth="3"></l-logo>-->

    <l-container v-else width="3840" height="2160" class="container">
      <div class="header">
        <top-header></top-header>
      </div>
      <div class="separator"/>
      <div class="center">
        <div class="left">
          <div class="left1">
            <left-total-user></left-total-user>
          </div>
          <div class="left2">
            <left-average-age></left-average-age>
          </div>
          <div class="left3">
            <left-total-device></left-total-device>
          </div>
          <div class="left4">
            l4
          </div>
          <div class="left5">
            l5
          </div>
          <div class="left6">
            l6
          </div>
        </div>
        <div class="right">
          <div class="right-top1">
            r t 1
          </div>
          <div class="right-top2">
            r t 2
          </div>
          <div class="right-bottom">
            <div class="right-left">
              <div class="right-left1">
                r l 1
              </div>
              <div class="right-left2">
                r l 2
              </div>
              <div class="right-left3">
                r l 3
              </div>
              <div class="right-left4">
                r l 4
              </div>
            </div>
            <div class="right-right">
              <div class="right-right1">
                r r 1
              </div>
              <div class="right-right2">
                r r 2
              </div>
            </div>
          </div>
        </div>
      </div>
    </l-container>
  </div>

</template>

<script>
import {ref} from "vue";
import TopHeader from "@/components/TopHeader";
import LeftTotalUser from "@/components/LeftTotalUser";
import LeftAverageAge from "@/components/LeftAverageAge";
import LeftTotalDevice from "@/components/LeftTotalDevice";

export default {
  name: 'App',
  components: {
    TopHeader,
    LeftTotalUser,
    LeftAverageAge,
    LeftTotalDevice
  },
  setup() {

    const isLoading = ref(false);
    // setTimeout(() => isLoading.value = false, 2000);

    return {
      isLoading
    }

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

.loading-title {
  color: white;
  font-size: 24px;
}

.screen-home {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #1d1d1d;
  color: #fff;
  font-size: 48px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container .header {
  width: 100%;
  height: 167px;
}

.container .separator {
  width: 100%;
  height: 10px;
  background: #5c5859;
}

.center {
  flex: 1;
  display: flex;
  width: 100%;
}

.center .left {
  flex: 0 0 860px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 860px;
  height: 100%;
  padding-bottom: 20px;
  box-sizing: border-box;
}

.center .left .left1 {
  height: 300px;
  background: grey;
}

.center .left .left2 {
  height: 320px;
  background: grey;
}

.center .left .left3 {
  height: 280px;
  background: grey;
}

.container .center .left .left4 {
  height: 230px;
  background: grey;
}

.center .left .left5 {
  height: 360px;
  background: grey;
}

.center .left .left6 {
  height: 360px;
  background: grey;
}

.center .right {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.center .right .right-top1 {
  width: 100%;
  height: 206px;
  background: grey;
}

.center .right .right-top2 {
  width: 100%;
  height: 48px;
  background: grey;
  margin: 10px 0;
}

.center .right .right-bottom {
  flex: 1;
  display: flex;
  padding-bottom: 20px;
}

.center .right .right-bottom .right-left {
  flex: 0 0 1917px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1917px;
}

.center .right .right-bottom .right-left .right-left1 {
  height: 999px;
  background: grey;
}

.center .right .right-bottom .right-left .right-left2 {
  height: 80px;
  background: grey;
}

.center .right .right-bottom .right-left .right-left3 {
  height: 350px;
  background: grey;
}

.center .right .right-bottom .right-left .right-left4 {
  height: 220px;
  background: grey;
}

.center .right .right-bottom .right-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 20px;
}

.center .right .right-bottom .right-right .right-right1 {
  width: 100%;
  height: 999px;
  background: grey;
}

.center .right .right-bottom .right-right .right-right2 {
  flex: 1;
  width: 100%;
  margin-top: 20px;
  background: grey;
}

</style>
