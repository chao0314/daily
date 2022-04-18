<template>
  <div class="total-user">
    <div class="total-user__title">
      <p>用户总数</p>
      <p>User ToTal Count</p>
    </div>
    <p class="total-user__total">
      <l-count-to :startVal="userStartRef" :endVal="userRef" :duration="1000"></l-count-to>
    </p>
    <div class="total-user__growth">
      <p>每日增长率:
        <l-count-to suffix="%" :startVal="lastDayStartRef" :endVal="lastDayRef" :duration="1000"></l-count-to>
      </p>
      <p>每月增长率:
        <l-count-to suffix="%" :startVal="lastMonthStartRef" :endVal="lastMonthRef" :duraiton="1000"></l-count-to>
      </p>
    </div>
    <div class="total-user__progress">
      <p></p>
    </div>
  </div>
</template>

<script>
import screenData from '../../data/screen';
import {ref, watch} from "vue";
import {registerMock} from "@/utils";

export default {
  name: "LeftTotalUser",
  setup(props, ctx) {

    const {userToday, userGrowthLastDay, userGrowthLastMonth} = screenData;
    const userRef = ref(Number(userToday));
    const userStartRef = ref(Number(userToday));
    const lastDayRef = ref(Number(userGrowthLastDay));
    const lastDayStartRef = ref(Number(userGrowthLastDay));
    const lastMonthRef = ref(Number(userGrowthLastMonth));
    const lastMonthStartRef = ref(Number(userGrowthLastMonth));

    registerMock([userRef, lastDayRef, lastMonthRef]);

    watch([userRef, lastDayRef, lastMonthRef], (newVal, oldVal) => {

      userStartRef.value = oldVal[0];
      lastDayStartRef.value = oldVal[1];
      lastMonthStartRef.value = oldVal[2];

    })


    return {
      userRef, lastDayRef, lastMonthRef,
      userStartRef, lastDayStartRef, lastMonthStartRef
    }

  }
}
</script>

<style scoped>

.total-user {
  height: 100%;
  padding: 20px 40px;
  background: rgb(66, 66, 66);
}

.total-user__title {
  font-size: 32px;
}

.total-user__title p:last-child {

  font-size: 20px;
  margin-top: 10px;
  letter-spacing: 2px;
}

.total-user__total {
  font-size: 68px;
  letter-spacing: 2px;
  padding: 10px 0;
  font-weight: bolder;

}

.total-user__growth {
  display: flex;
  font-size: 28px;
  letter-spacing: 2px;
}

.total-user__growth > p:first-child {
  color: rgb(200, 250, 120);
}

.total-user__growth > p:last-child {
  margin-left: 20px;
  color: rgb(100, 170, 0);
}

.total-user__progress {

  height: 20px;
  margin-top: 10px;
  border: 1px solid white;
  position: relative;
}

.total-user__progress > p {
  width: 30%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgb(150, 150, 150);
  transition: width 1s linear;
}
</style>