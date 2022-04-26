<template>
  <div class="total-gender">
    <div class="total-gender__item">
      <img src="../assets/datav_circle.png" alt="">
      <div class="total-gender__info">
        <p>男性用户数</p>
        <p>Number of Male Users</p>
        <p>
          <l-count-to></l-count-to>
          <span>万人</span>
        </p>
      </div>
    </div>

    <div class="total-gender__item">
      <img src="../assets/datav_circle.png" alt="">
      <div class="total-gender__info">
        <p>女性用户数</p>
        <p>Number of Female Users</p>
        <p>
          <l-count-to></l-count-to>
          <span>万人</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftTotalGender"
}
</script>

<style scoped>
.total-gender {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: rgb(45, 45, 45);
}

.total-gender__item {
  display: flex;
}

.total-gender__item > img {
  width: 75px;
  height: 75px;
}

.total-gender__info {
  margin-left: 40px;

}

.total-gender__info > p:first-child {
  font-size: 32px;
}

.total-gender__info > p:nth-child(2) {
  font-size: 16px;
  margin-top: 10px;
}

.total-gender__info > p:last-child {
  font-size: 50px;
  margin-top: 10px;
  font-weight: bold;
}

.total-gender__info > p:last-child > span:last-child {
  font-size: 20px;
}
</style>