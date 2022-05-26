<template>
    <div class="cart">
        <b>this is cart</b>
        <cart-item :items="items"></cart-item>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import CartItem from "./CartItem";
    export default {
        name: "Cart",
        computed:{
            items(){
                return this.$store.state.dynamicRoute[this.$route.path];
            }
        },
        components:{
            CartItem
        }


    }
</script>

<style scoped>
    .cart{
        background: #62c462;
        height: 400px;
    }
</style>