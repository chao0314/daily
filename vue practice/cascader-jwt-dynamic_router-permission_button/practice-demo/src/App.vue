<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            |
            <router-link to="/about">About</router-link>
        </div>
        <router-view/>
        <div v-click-out="close">
            <input type="text" :value="value" @click="shouldShow = !shouldShow">
            <com-cascade v-if=shouldShow :items="items" @select="select" :load="load"></com-cascade>
        </div>

    </div>
</template>
<script>
    import ComCascade from "./components/common/ComCascade";

    export default {
        name: 'App',
        components: {
            ComCascade
        },
        data() {
            return {
                items: [],
                value: '',
                shouldShow: false
            }
        },
        created() {
            this.$store.dispatch("getDataById", 0).then(data => this.items = data);
        },
        methods: {
            select(value) {
                this.value = value.join('/');
            },
            load(id, callback) {
                this.$store.dispatch("getDataById", id).then(data => callback(data));
            },
            close() {
                this.shouldShow = false;
            }

        }


    }

</script>

<style>
    * {
        margin: 0;
        padding: 0;
        outline: 0;
    }

</style>
<style scoped>
    input {
        display: inline-block;
        width: 200px;
        height: 30px;
    }
</style>
