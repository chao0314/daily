<template>
  <div class="top-header">
    <div class="top-header__logo">
      <l-logo stroke="red" strokeWidth="50"></l-logo>
    </div>
    <div class="top-header__title">
      <p>业务数据大屏</p>
      <p>Overview of Business Data</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopHeader"
}
</script>

<style scoped>
.top-header {
  background: rgb(30, 30, 30);
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 60px;
}

.top-header__logo {
  width: 160px;
  height: 140px;
}

.top-header__title {
  margin-left: 60px;
}

.top-header__title > p:first-child {
  font-size: 60px;
  font-weight: bold;
}

.top-header__title > p:last-child {
  font-size: 35px;
  letter-spacing: 2px;
  word-spacing: 10px;
}
</style>