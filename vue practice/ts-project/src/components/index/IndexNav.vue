<template>
    <div class="index-page-container">
        <div class="index-nav">
            <div class="index-nav-header clearfix">
                <h2 class="fl">主题市场</h2>
                <ul class="index-nav-header-bd fl">
                    <li class="fl"><a href="#">天猫</a></li>
                    <li class="fl"><a href="#">聚划算</a></li>
                    <li class="fl"><a href="#">天猫超市</a></li>
                </ul>
                <ul class="index-nav-header-bd fl">
                    <li class="pipe fl">|</li>
                    <li class="fl"><a href="#">淘抢购</a></li>
                    <li class="fl"><a href="#">电器城</a></li>
                    <li class="fl"><a href="#">司法拍卖</a></li>
                    <li class="fl"><a href="#">淘宝心选</a></li>
                    <li class="fl"><a href="#">兴农扶贫</a></li>
                </ul>
                <ul class="index-nav-header-bd fl">
                    <li class="pipe fl">|</li>
                    <li class="fl"><a href="#">飞猪旅行</a></li>
                    <li class="fl"><a href="#">智能生活</a></li>
                    <li class="fl"><a href="#">苏宁易购</a></li>
                </ul>
            </div>
            <div class="index-nav-content clearfix">
                <div class="main fl">
                    <div class="main-top clearfix">
                        <index-nav-catalog></index-nav-catalog>
                        <div class="index-nav-banner-container fl">
                            <div class="banners fl">
                                <index-banner class="banner-1" :list="banners"></index-banner>
                                <div class="tmall-title clearfix">
                                    <img src="../../assets/imgs/banner2-title.png" class="fl" alt="">
                                    <span class="title fl">理想生活上天猫</span>
                                    <span class="indicator fr">
                        <i>6</i>/6
                      </span>
                                    <span class="indicator-bar">
                      </span>
                                </div>
                                <index-banner class="banner-2" :list="banners"></index-banner>
                            </div>
                            <div class="ads fr">
                                <a href="#" class="ad1">
                                    <img src="../../assets/imgs/ad1.webp" alt="">
                                </a>
                                <div class="ad2">
                                    <h4>今日热卖</h4>
                                    <a href="#">
                                        <img src="../../assets/imgs/ad2.jpg" alt="">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-bottom">
                        <a href="#" class="taobao-toutiao"></a>
                    </div>
                </div>
                <div class="right fr">

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import IndexNavCatalog from "@/components/index/IndexNavCatalog.vue";
    import IndexBanner from "@/components/index/IndexBanner.vue";
    import {Actions} from "@/decorator/Store";
    import {BannerItem, AdItem} from "@/type/search";

    @Component({
        components: {
            IndexNavCatalog,
            IndexBanner
        }
    })
    export default class IndexNav extends Vue {
        @Actions
        private getBanners!: Function;
        @Actions
        private getAds!: Function;
        private banners: BannerItem[] = [];
        private ads: { [index: string]: AdItem } = {};

        created() {
            this.getBanners().then((res: BannerItem[]) => this.banners = res).catch((err: Error) => console.log(err));
            // Promise.all([this.getBanners(), this.getAds()]).then(([banners, ads]) => {
            //     this.banners = banners;
            //     this.ads = ads;
            //     console.log("ads", ads);
            // }).catch(err => {
            //     console.log(err);
            // })

        }


    }
</script>

<style>
    .banner-1 {
        width: 520px;
        height: 280px;
    }

    .banner-2 {
        width: 520px;
        height: 198px;
    }
</style>

<style lang="css" scoped>
    .index-nav {
    }

    .index-nav-header {
        width: 1190px;
        height: 30px;
        background-image: linear-gradient(to right, #ff9000 0, #ff5000 100%);
    }

    .index-nav-header h2 {
        width: 190px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        background: #ff5000;
        color: #FFF;
    }

    .index-nav-header-bd {
    }

    .index-nav-header-bd li {
        padding: 0 4px;
        margin-left: 3px;
    }

    .index-nav-header-bd .pipe {
        margin-left: 7px;
        line-height: 30px;
        color: #FFF;
        font-size: 14px;
    }

    .index-nav-header-bd a {
        display: block;
        padding: 0 5px;
        font-size: 16px;
        font-weight: 700;
        line-height: 30px;
        color: #FFF;
    }

    .index-nav-content {
        width: 1190px;
        height: 632px;
    }

    .index-nav-content .main {
        width: 900px;
        height: 632px;
    }

    .index-nav-content .main-top {
        width: 900px;
        height: 522px;
        position: relative;
    }

    .index-nav-content .main-bottom {
        width: 890px;
        height: 100px;
        margin-top: 10px;
    }

    .index-nav-content .right {
        width: 290px;
        height: 622px;
        margin-top: 10px;
        background: url(../../assets/imgs/_main-right.png) no-repeat;
    }


    .tmall-title {
        width: 520px;
        height: 16px;
        padding-top: 10px;
        padding-bottom: 3px;
        border-bottom: 3px solid #ff1648;
        overflow: hidden;
    }

    .tmall-title .title {
        font-size: 12px;
        color: #666;
        margin-left: 14px;
    }

    .tmall-title .indicator i {
        color: #ff1648;
    }


    .taobao-toutiao {
        display: block;
        width: 890px;
        height: 100px;
        background: url(../../assets/imgs/tb-toutiao.png);
    }
</style>