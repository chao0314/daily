<template>
    <div class="cart">
        <b>this is cart</b>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Cart"
    }
</script>

<style scoped>
    .cart{
        background: #62c462;
        height: 400px;
    }
</style>