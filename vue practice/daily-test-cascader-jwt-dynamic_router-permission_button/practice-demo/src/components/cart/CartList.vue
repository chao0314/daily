<template>
    <div class="list"><b>this is cart list</b>
    <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "CartList"
    }
</script>

<style scoped>
    .list{
        background: silver;
        height: 200px;
    }

</style>