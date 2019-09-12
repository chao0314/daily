<template>
  <el-upload
    :action="action"
    :limit="limit"
    :multiple="multiple"
    :on-success="success"
    :on-remove="remove"
  >
    <el-button type="primary">添加</el-button>
  </el-upload>
</template>

<script>
    import {uploadUrl} from '~/config';

    export default {
        name: "ComUpload",
        props: {
            limit: {
                type: Number,
                default: 1
            },
            multiple: {
                type: Boolean,
                default: false
            }

        },
        data() {
            return {
                action: uploadUrl
            }
        },
        methods:{
            success(res,file,files){

            },
            remove(file,files){

            }
        }
    }
</script>

<style scoped>

</style>
