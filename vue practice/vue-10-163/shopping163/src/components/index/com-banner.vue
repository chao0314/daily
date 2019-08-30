<template>
    <div class="banner" @mouseover="stopPlay" @mouseout="autoPlay">
        <a href="javascript:;" class="btn prev" @click="previous">上一项</a>
        <a href="javascript:;" class="btn next" @click="next">下一项</a>
        <ul class="banner-list">
            <li class="banner-container" :class="{cur:active=== index}" v-for="(banner,index) in banners"
                :key="banners.title">
                <a :href="banner.href">
                    <img :src="banner.src | imgpath">
                </a>
            </li>
        </ul>
        <ol class="number-list">
            <li :class="{active:active===index}" v-for="(v,index) in banners" :key="v.title"
                @click="change(index)"></li>
        </ol>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "com-banner",
        data() {
            return {
                banners: [],
                active: 0,
                timer: null
            }
        },
        created() {
            this.getBanners().then(data => {
                this.banners = data;
                this.autoPlay();
            }).catch(err => console.log(err));
        },
        methods: {
            ...mapActions("index", ["getBanners"]),
            previous() {
                if (this.active === 0) {
                    this.active = this.banners.length - 1;
                } else {
                    this.active--
                }
            },
            next() {
                if (this.active === this.banners.length - 1) {
                    this.active = 0;
                } else {
                    this.active++;
                }
            },
            autoPlay() {
                this.timer = setTimeout(() => {
                    this.next();
                    this.autoPlay();
                }, 1500)
            },
            stopPlay() {
                clearTimeout(this.timer);
            },
            change(index) {
                this.active = index;
                this.stopPlay();
                this.autoPlay();
            }
        },
        beforeDestroy() {
            this.stopPlay();
        }
    }
</script>


<style lang="css" scoped>
    /* banner */
    .banner {
        height: 420px;
        position: relative;
    }

    .banner-list {
    }

    .banner-container {
        width: 1920px;
        height: 420px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        opacity: 0;
        transition: .7s all ease
    }

    .banner-container img {
        width: 1920px;
        height: 420px;
    }

    .banner-container.cur {
        opacity: 1;
    }

    .banner .btn {
        position: absolute;
        z-index: 2;
        left: 50%;
        top: 200px;
        text-indent: -99999px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #D0C4AF;
        background-image: url(../../assets/imgs/icon2.png);
        background-repeat: no-repeat;
    }

    .banner .btn:hover {
        background-color: #B19E7A;
    }

    .banner .btn.prev {
        background-position: 0 -5384px;
        margin-left: -605px;
    }

    .banner .btn.next {
        background-position: 0 -5604px;
        margin-left: 555px;
    }

    .banner .number-list {
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 4px;
        text-align: center;
        z-index: 2;
    }

    .banner .number-list li {
        display: inline-block;
        width: 8px;
        height: 8px;
        margin: 0 8px 10px;
        cursor: pointer;
        background: #FFF;
        border-radius: 50%;
        border: 1px solid #cecece;
        transition: .7s all ease
    }

    .banner .number-list .active {
        background: #a7936e;
        box-shadow: 0 0 0 4px #dfcead;
    }
</style>
