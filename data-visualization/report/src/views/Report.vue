<template>
  <div class="report">
    <top-index></top-index>
    <main-index></main-index>
    <bottom-index></bottom-index>
  </div>
</template>

<script>
import TopIndex from "@/components/top/Top";
import MainIndex from "@/components/mian/Main";
import BottomIndex from "@/components/bottom/Bottom";

export default {
  name: "report",
  components: {
    TopIndex,
    MainIndex,
    BottomIndex
  },
  setup() {


  }
}
</script>

<style scoped>
.report {
  background: #EEEEEE;
  padding: 20px;
}

</style>