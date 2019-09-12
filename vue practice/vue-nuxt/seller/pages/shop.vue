<template>
  <com-main>
    <el-form>
      <el-form-item>
        <el-button type="primary">添加</el-button>
      </el-form-item>
    </el-form>

    <shop-dialog></shop-dialog>

  </com-main>
</template>

<script>
    import ComMain from '~/components/ComMain.vue';
    import ShopDialog from "../components/ShopDialog";

    export default {
        name: "shop",
        components: {
            ComMain,
            ShopDialog
        }
    }
</script>

<style scoped>

</style>
