<template>

    <div class="cart-item">
        <template v-for="item in items">
            <router-link :to="{name:item.path}">{{item.name}}</router-link>
            <cart-item v-if="item.children &&item.children.length >0" :items="item.children"></cart-item>
        </template>

    </div>
</template>

<script>
    export default {
        name: "CartItem",
        props: {
            items: {
                type: Array,
                default:()=>[]
            }
        }
    }
</script>

<style scoped>
    .cart-item a {
        display: block;
    }

</style>