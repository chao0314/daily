<template>
    <!--内容-->
    <form>
        <div class="form-group" v-for="item in  formFields">
            <label>{{item.label}}:
                <input v-if="item.type === 'file' " :ref="item.name" type="file" class="form-control" :name="item.name">
                <input v-else :ref="item.name" :type="item.type" class="form-control" :name="item.name"
                       v-model="item.value">
            </label>
        </div>

        <div class="form-group">
            <button type="button" class="btn btn-primary" @click="confirm">确认</button>
            <button type="button" class="btn btn-default" @click="cancel">取消</button>
        </div>
    </form>

</template>

<script>
    export default {
        name: "Form",
        props: {
            fields: {
                default: () => [{
                    name: "field",
                    type: "text",
                    value: "what...",
                    label: "input"
                }]
            }
        },
        data() {
            return {
                formFields: []
            }
        },
        created() {
            this.formFields = this.fields.map(field => Object.assign({}, field));

        },
        methods: {
            confirm() {
                //todo... validate
                let formData = new FormData();

                this.formFields.forEach(({name, value, type}) => {

                    if (type === 'file') {
                        this.$refs[name][0].files.forEach(file => formData.append(name, file));
                    } else {
                        console.log(name, value);
                        formData.append(name, value);
                    }

                })

                this.$emit('confirm', formData);

            },
            cancel() {
                this.$emit('cancel');
            }
        }
    }
</script>

<style scoped>

</style>