<template>
  <div class="report">
    <el-row :gutter="12">
      <el-col :span="6">
        <top-sales-card></top-sales-card>
      </el-col>
      <el-col :span="6">
        <top-orders-card></top-orders-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">3</el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">4</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopSalesCard from "@/components/TopSalesCard";
import TopOrdersCard from "@/components/TopOrdersCard";

export default {
  name: "report",
  components: {
    TopSalesCard,
    TopOrdersCard
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