<template>
  <com-card :title=title :value="value">
    <template #default class="default">
      <div class="compare-main">
        <p class="compare">
          <span>日同比</span>
          <span class="emphasis">{{ dayCompare }}</span>
          <span class="up-arrow"></span>
        </p>
        <p class="compare">
          <span>月同比</span>
          <span class="emphasis">{{ monthCompare }}</span>
          <span class="down-arrow"></span>
        </p>
      </div>
    </template>
    <template #footer>
      <p>昨日销售额 <span class="emphasis">{{ yesterdaySales }}</span></p>
    </template>

  </com-card>
</template>

<script>
import ComCard from "@/components/top/ComCard";

export default {
  name: "TopSalesCard",
  components: {ComCard},
  setup(ctx, props) {

    const title = '累计销售额';
    const value = '¥ 1234,5678';
    const yesterdaySales = '¥ 1234,5678';
    const dayCompare = '11%';
    const monthCompare = '22%';

    return {
      title,
      value,
      dayCompare,
      monthCompare,
      yesterdaySales,
    }

  }

}
</script>

<style scoped>

.compare-main {

  height: 100%;
}

.compare {
  height: 50%;
  font-size: 12px;
  color: #666;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.compare span {
  margin-right: 5px;

}




</style>

