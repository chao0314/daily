<template>
  <el-row :gutter="12">
    <el-col :span="6">
      <top-sales-card></top-sales-card>
    </el-col>
    <el-col :span="6">
      <top-orders-card></top-orders-card>
    </el-col>
    <el-col :span="6">
      <top-transaction-card></top-transaction-card>
    </el-col>
    <el-col :span="6">
      <top-user-card></top-user-card>
    </el-col>
  </el-row>
</template>

<script>
import TopSalesCard from "@/components/top/TopSalesCard";
import TopOrdersCard from "@/components/top/TopOrdersCard";
import TopTransactionCard from "@/components/top/TopTransactionCard";
import TopUserCard from "@/components/top/TopUserCard";

export default {
  name: "top",
  components:{
    components: {
      TopSalesCard,
      TopOrdersCard,
      TopTransactionCard,
      TopUserCard
    }
  }

}
</script>

<style scoped>

</style>