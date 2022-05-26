<template>
    <div class="index-header-banner" ref="banner">
        <a href="#" class="btn btn-prev" @click="prev">&lt;</a>
        <a href="#" class="btn btn-next" @click="next">&gt;</a>
        <ul :style="{width:totalLength,left:left}">
            <li v-for="item in list">
                <a :href="item.href">
                    <img :src="item.img|imgPath" alt="">
                </a>
            </li>
        </ul>
        <div class="nums">
            <ol>
                <li v-for="(v,index) in list" :class="{cur:cur===index}"></li>

            </ol>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {BannerItem} from "@/type";

    @Component({
        components: {}
    })
    export default class IndexBanner extends Vue {
        @Prop({type: [Array], required: true}) readonly list!: BannerItem[];
        @Prop({default: 1, type: Number}) current!: number;
        private itemLength!: number;
        private cur: number = 0;

        next() {
            this.cur = this.cur === this.list.length - 1 ? 0 : this.cur + 1;
        }

        prev() {
            this.cur = this.cur === 0 ? this.list.length - 1 : this.cur - 1;
        }

        mounted() {
            this.itemLength = (this.$refs.banner as HTMLElement).offsetWidth;
            // this.itemLength = (<HTMLElement>this.$refs.banner).offsetWidth;
        }

        get totalLength() {
            return this.list.length * Number(this.itemLength) + "px";
        }

        get left() {
            return -this.cur * Number(this.itemLength) + "px";
        }


    }
</script>

<style lang="css">
    .index-nav-banner-container {
        width: 710px;
    }

    .index-nav-banner-container .banners {
        width: 520px;
        height: 512px;
        margin-left: 10px;
        margin-top: 10px;
    }

    .index-nav-banner-container .ads {
        width: 160px;
        height: 512px;
        margin-right: 10px;
        margin-top: 10px;
    }

    .index-nav-banner-container .ads .ad1 {
        width: 160px;
        height: 280px;
    }

    .index-nav-banner-container .ads .ad1 img {
        width: 160px;
        height: 280px;
    }

    .index-nav-banner-container .ads .ad2 {
        width: 160px;
        height: 230px;
    }

    .index-nav-banner-container .ads .ad2 h4 {
        padding-top: 6px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        font-weight: 400;
        color: #a1a1a1;
        background: #f1f1f1;
    }

    .index-nav-banner-container .ads .ad2 img {
        width: 160px;
        height: 200px;
    }

    /*  */
    .index-header-banner {
        position: relative;
        overflow: hidden;
    }

    .index-header-banner ul {
        height: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
        transition: .3s all ease;
    }

    .index-header-banner ul li {
        width: 520px;
        height: 100%;
        float: left;
    }

    .index-header-banner .btn {
        width: 20px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        position: absolute;
        z-index: 2;
        top: 50%;
        margin-top: -15px;
        background: rgba(0, 0, 0, .3);
        color: #fff;
        display: none;
    }

    .index-header-banner .btn-prev {
        left: 0;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        text-indent: -5px;
    }

    .index-header-banner .btn-next {
        right: 0;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        text-indent: 5px;
    }

    .index-header-banner .btn:hover {
        background: rgba(0, 0, 0, .5)
    }

    .index-header-banner:hover .btn {
        display: block;
    }


    /* .banner-1 {
      width:520px;height:280px;
    }



    .banner-2 {
      width:520px;height:198px;
    } */


    .index-header-banner .nums {
        position: absolute;
        top: 252px;
        z-index: 2;
        width: 100%;
        text-align: center;
    }

    .index-header-banner .nums ol {
        overflow: hidden;
        display: inline-block;
        background: rgba(255, 255, 255, .3);
        border-radius: 10px;
    }

    .index-header-banner .nums li {
        width: 8px;
        height: 8px;
        margin: 3px;
        background: #FFF;
        border-radius: 50%;
        float: left;
    }

    .index-header-banner .nums li.cur {
        background: #ff5000
    }


</style>