<template>
    <header class="index-header">
        <div class="index-header-content">
            <div class="index-header-logo">
                <div class="logo">
                    <h1>淘宝网</h1>
                </div>
            </div>
            <index-header-search></index-header-search>
            <a href="https://mpage.taobao.com/hd/download.html" target="_blank" class="index-header-tbh">手机淘宝</a>
        </div>
    </header>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import IndexHeaderSearch from "@/components/index/IndexHeaderSearch.vue";

    @Component({
        components: {
            IndexHeaderSearch
        }
    })
    export default class IndexHeader extends Vue {

    }
</script>

<style lang="css">
    .index-header {
        padding-top:24px;height:97px;
        background:#FFF;
    }
    .index-header-content {
        width:1190px;height:88px;
        margin:0 auto;
        position:relative;
    }
    .index-header-logo {
        float:left;margin-left:22px;
        width:190px;height:88px;
    }
    .index-header-logo .logo {margin-top:8px;}
    .index-header-logo h1 {width:190px;height:58px;background:url(../../assets/imgs/site-logo.png) no-repeat;text-indent:-9999px;}

    .index-header-tbh {
        position:absolute;
        right:110px;top:0;
        width:76px;height:90px;
        background:url(../../assets/imgs/site-qrcode.png) no-repeat;
        text-indent:-9999px;
    }
</style>