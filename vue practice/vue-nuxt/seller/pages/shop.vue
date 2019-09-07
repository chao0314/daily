<template>
      <com-main>
        <el-form>
          <el-form-item>
            <el-button type="primary">添加</el-button>
          </el-form-item>
        </el-form>
      </com-main>
</template>

<script>
  import ComMain from '~/components/ComMain.vue';
    export default {
        name: "shop",
        components:{ComMain}
    }
</script>

<style scoped>

</style>
