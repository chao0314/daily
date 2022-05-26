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
                files: []
            }
        },
        methods: {
            success(res, file, files) {
                console.log("success", res, file, files);
                this.files.push(res.data[0]);
                file.tempID = res.data[0];

            },
            remove(file, files) {
                console.log("remove", file, files);
                this.files = this.files.filter(item => item !== file.tempID);
            }
        },
        computed: {
            action() {
                return uploadUrl + "&token=" + this.$store.state.userInfo.token;
            }
        },
        watch: {
            files() {
                if (this.limit === 1) this.$emit("input", this.files[0]);
                else this.$emit('input', this.files);
            }
        }
    }
</script>

<style scoped>

</style>
