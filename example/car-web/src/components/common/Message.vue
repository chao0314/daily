<template>
    <div v-show="display">
        <div class="mask"></div>
        <div class="message">
            <p>{{message}}</p>
            <div class="button">
                <button @click="cancel">取消</button>
                <button @click="confirm">确认</button>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Message",
        data() {
            return {
                display: false,
                message: '这是个弹框'

            }
        },
        methods: {
            cancel() {
                this.display = false;
                this.$emit('cancel');
            },
            confirm() {
                this.display = false;
                this.$emit('confirm');
            }
        }
    }
</script>

<style scoped>


    .mask {
        position: fixed;
        width: 100%;
        height: 100%;
        background: white;
        opacity: 0.5;
        left: 0;
        top: 0;
        z-index: 98;

    }

    .message {
        position: absolute;
        width: 300px;
        height: 200px;
        border: 2px solid darkseagreen;
        text-align: center;
        left: 50%;
        top: 30%;
        transform: translateX(-50%);
        background: lightgrey;
        z-index: 99;

    }

    .message > p {
        height: 160px;
        line-height: 160px;

    }
</style>