<template>
  <com-card :title="title" :value="value">
    <template #default>
      123
    </template>
    <template #footer>
      <p class="">昨日订单量 <span class="emphasis">{{ yesterdaySales }}</span></p>
    </template>
  </com-card>

  <v-chart :options="options" autoresize ></v-chart>

</template>

<script>
import ComCard from "@/components/ComCard";
import {reportData} from "../../data/data";

export default {
  name: "TopOrdersCard",
  components: {ComCard},
  setup(props, ctx) {

    const title = '累计订单量';
    const value = '1234,5678';
    const yesterdaySales = '200,000,000';
    const orderTrend = reportData.orderTrend;
    console.log(orderTrend)
    const options = {


    }


    return {
      title,
      value,
      options,
      yesterdaySales
    }


  }
}
</script>

<style scoped>

</style>