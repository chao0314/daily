<template>
    <Dialog :title="title">
        <Form :fields="fields" @cancel="cancel" @confirm="confirm"></Form>
    </Dialog>
</template>

<script>
    import Dialog from "../common/Dialog";
    import Form from "../common/Form";

    export default {
        name: "BannerForm",
        components: {
            Dialog,
            Form
        },
        props: {
            title: {
                type: String,
                default: ""
            },
            fields: {
                required: true
            }

        },
        methods: {
            cancel(payload) {
                this.$emit('cancel', payload);

            },
            confirm(payload) {
                this.$emit('confirm', payload);

            }

        }
    }
</script>

<style scoped>
    .dialog-panel {
        position: fixed;
        left: 50%;
        top: 200px;
        width: 500px;
        margin-left: -250px;
        z-index: 99;
    }

    .dialog-shadow {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.3;
        z-index: 98;
    }

</style>