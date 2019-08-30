<template>
    <div class="crumbs">
        <router-link to="/">全部商品</router-link>
        <template v-for="item in path">
            <span class="spliter">&gt;</span>
            <a href="#" class="cur">{{item}}</a>
        </template>

    </div>
</template>

<script>
    export default {
        name: "com-crumbs",
        props:{
            path:{
                type:Array,
                default:()=>[]
            }
        }
    }
</script>

<style lang="css" scoped>
    .crumbs {
        padding:24px 0;font-size:12px;
    }

    .crumbs a {
        color:#333;
    }
    .crumbs a.cur {
        color:#999;
    }

    .crumbs .spliter {
        margin:0 7px;
    }
</style>