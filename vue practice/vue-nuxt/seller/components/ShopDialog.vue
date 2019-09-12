<template>
  <el-dialog :visible.sync="visible">
    <com-upload></com-upload>

  </el-dialog>

</template>

<script>
    import ComUpload from "./ComUpload";

    export default {
        name: "ShopDialog",
        components: {
            ComUpload
        },
        data() {
            return {
                visible: true
            }
        },
        methods: {
            close(done) {
                return done();
            }
        }
    }
</script>

<style scoped>

</style>
