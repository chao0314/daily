<template lang="html">
    <div>
        <header class="page-header">
            <div class="page">
                <h1 class="logo fl">淘宝网</h1>
            </div>
        </header>
        <div class="banner" :style="{background:shop.banner.color}">
            <div class="page banner-container">
                <img :src="shop.banner.img|imgPath" alt="">
            </div>
        </div>
        <div class="menu">
            <div class="container-950">
                <ul>
                    <li v-for="menu in shop.menus"><a :href="menu.href">{{menu.title}}</a></li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {shop} from "@/type/detail";

    @Component
    export default class Header extends Vue {
        @Prop({
            type: Object, default: () => {
            }, required: true
        }) shop!: shop;

    }
</script>

<style scoped>
    /*  */
    .page-header {
        height: 60px;
        padding-top: 10px;
    }

    .page-header .logo {
        width: 96px;
        height: 38px;
        background: url(../../assets/imgs/tb-logo.png) no-repeat;
        background-size: 100% 100%;
        text-indent: -9999px;
        margin-top: 5px;
    }

    /*  */
    .banner {
        height: 120px;
    }

    .banner .banner-container {
        overflow: hidden;
        text-align: center;
    }

    /*  */
    .menu {
        background: #336800;
        height: 30px;
    }

    .menu ul li {
        float: left;
        border-left: solid 1px #2b5700;
        background: #336800;
        width: 64px;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }

    .menu ul li a {
        color: #d3ffaa;
    }
</style>

<style lang="css">

</style>
