<template>
<div class="sales-bar">
<!--  <v-chart :option="option"></v-chart>-->
</div>
</template>

<script>
import data from "../../data";
export default {
  name: "SalesBar",
  setup(props,ctx){
    const salesBar =  data.salesBar;
    const option =  {



    }
    return{
      option

    }

  }
}
</script>

<style scoped>
.sales-bar{
  height: 325px;
  margin: 12px;
  background:rgba(255,255,255,0.5);
}



</style>