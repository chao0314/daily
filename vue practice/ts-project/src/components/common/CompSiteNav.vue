<template>
    <div class="site-nav">
        <div class="site-nav-page">
            <div class="site-nav-menu fl" v-if="!userInfo.name">
                <a href="#" class="site-nav-menu-login fl" @click="login">亲，请登录</a>
                <a href="#" class="site-nav-menu-reg fl" @click="register">免费注册</a>
            </div>
            <div class="site-nav-menu fl" v-else>
                <a href="#" class="site-nav-menu-login fl">你好，{{userInfo.name}}</a>

            </div>
            <div class="site-nav-menu fr">
                <div class="site-nav-menu-container fl">
                    <a href="#" class="site-nav-menu-mytb">
                        我的淘宝
                        <i class="site-nav-arrow">▾</i>
                    </a>
                    <div class="site-nav-menu-list">
                        <a href="#" class="site-nav-menu-list-item">已买到的宝贝</a>
                        <a href="#" class="site-nav-menu-list-item">我的足迹</a>
                    </div>
                </div>
                <div class="site-nav-menu-container fl">
                    <a href="#" class="site-nav-menu-cart fl">
                        购物车<span>0</span>
                        <i class="site-nav-arrow">▾</i>
                    </a>
                </div>
                <div class="site-nav-menu-container fl">
                    <a href="#" class="site-nav-menu-service">
                        联系客服
                        <i class="site-nav-arrow">▾</i>
                    </a>
                    <div class="site-nav-menu-list">
                        <a href="#" class="site-nav-menu-list-item">消费者客服</a>
                        <a href="#" class="site-nav-menu-list-item">卖家客服</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {State} from "@/decorator/Store";

    @Component({
        components: {}
    })
    export default class CompSiteNav extends Vue {
        @State private userInfo!: { name: string, token: string, token_expires: string };

        private login(): void {
            this.$router.push({path: "/login"});
        }

        private register(): void {
            this.$router.push({path: "/register"});
        }

    }
</script>

<style lang="css" scoped>
    .site-nav {
        height: 35px;
        background: #f5f5f5;
        border-bottom: 1px solid #eee;
        position: relative;
        z-index: 2;
    }

    .site-nav a {
        color: #6C6C6C;
        font-size: 12px;
        height: 35px;
        line-height: 35px;
    }

    .site-nav-menu-login {
        margin-right: 7px;
    }

    .site-nav a.site-nav-menu-login {
        color: #f22e00 !important;
    }

    .site-nav a:hover {
        color: #F40;
    }

    .site-nav-arrow {
        display: inline-block;
        width: 12px;
        font-size: 12px;
        margin-left: 7px;
    }

    .site-nav {
    }

    .site-nav-menu {
    }

    .site-nav-menu-container {
        padding: 0 6px;
        margin-right: 7px;
        position: relative;
    }

    .site-nav-menu-container:hover {
        background: #FFF;
    }

    .site-nav-menu-list {
        background: #FFF;
        position: absolute;
        left: -1px;
        top: 35px;
        border: 1px solid #EEE;
        border-top: none;
        display: none;
    }

    .site-nav-menu-list-item {
        display: block;
        padding: 0 5px;
        line-height: 28px;
        white-space: nowrap;
        font-size: 12px;
        color: #6C6C6C;
    }

    .site-nav-menu-container:hover .site-nav-menu-list {
        display: block;
    }
</style>