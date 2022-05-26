<template>
    <div class="header">
        <div class="header-container clearfix">
            <div class="logo-container fl">
                <a href="http://you.163.com/" class="logo">严选商城</a>
            </div>
            <a href="/cart" class="cart fr">
                <span>购物车</span>
                <i>0</i>
            </a>
            <div class="search-container fr">
                <input type="text" class="search-txt fl" ref="search"
                       v-model="search.keyword"
                       @focus="search.getFocus=true"
                       @blur="slowHidden"
                       @keydown.up="suggestIndex--"
                       @keydown.down="suggestIndex++"
                       @keydown.enter=doSearch
                >
                <div class="suggest">
                    <ul v-show="search.keyword && search.getFocus">
                        <li :class="{active:search.active === index}"
                            v-for="(suggest,index) in search.suggests" :key="suggest"
                            @mouseover="suggestIndex = index"
                            @click="search.keyword = suggest"
                        >
                            {{suggest}}
                        </li>
                    </ul>
                </div>
                <a href="javascript:;" class="search-btn fl" @click="doSearch">搜索</a>
                <i class="icon"></i>
                <i class="placeholder" v-show="!search.getFocus && !search.keyword">{{search.placeholder}}</i>
                <div class="keyword-list clearfix">
                    <a href="javascript:;" class="fl">运动装备 7.5折起</a>
                    <a href="javascript:;" class="fl">蚕丝被 431元起</a>
                    <a href="javascript:;" class="fl">补水 保湿</a>
                    <a href="javascript:;" class="nbr fl">抗皱家居服</a>
                </div>
            </div>
        </div>
        <nav>
            <ul class="catalog-href-list clearfix">
                <li class="catalog-href  fl" :class="{active:catalog.active === -1}">
                    <a href="javascript:;" class="title">首页</a>
                </li>
                <li class="catalog-href fl" v-for="(catalog,index) in catalog.catalogs" :key="catalog">
                    <a href="javascript:;" class="title" @mouseover="showCatalog(index)" @mouseout="showCatalog(-1)">{{catalog}}</a>
                </li>
                <li class="catalog-href fl">
                    <a href="javascript:;" class="title">为你严选</a>
                </li>
                <li class="catalog-href fl">
                    <a href="javascript:;" class="title">众筹</a>
                </li>
            </ul>
            <div class="catalog-list" v-show="catalog.active >=0" @mouseover="clearTimer" @mouseout="showCatalog(-1)">
                <ul class="clearfix">
                    <li class="catalog-column fl" v-for="item in catalog.list" :key="item.title">
                        <div class="title">{{item.title}}</div>
                        <div>
                            <a :href="value.href" class="catalog-item" v-for="value in item.children">
                                <img :src="value.src | imgpath" alt="">
                                <span>{{value.title}}</span>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>

</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "com-header",
        data() {
            return {
                search: {
                    searching: false,
                    getFocus: false,
                    keyword: "",
                    placeholder: "张一山同款 开衫体恤",
                    suggests: [],
                    active: -1
                },
                catalog: {
                    catalogs: ["居家生活", "服饰鞋包", "个户清理", "母婴亲子", "运动旅行", "数码家电", "礼品特色"],
                    timer: null,
                    list: [],
                    active: -1
                }
            }
        },
        watch: {
            "search.keyword"(keyword) {
                if (!this.search.searching && keyword) {
                    this.search.searching = true;
                    this.getAutoComplete(keyword).then(data => {
                        this.search.suggests = data;
                        this.search.searching = false;
                    }).catch(err => {
                        this.search.searching = false;
                    });
                }
            },
            "catalog.active"(index) {
                if (index === -1) return;
                this.getCatalog(index).then(data => {
                    this.catalog.list = data;
                    console.log(data)
                }).catch(err => console.log(err));
            },
            $route(){
                this.search.keyword = this.$route.params.keyword || "";
            }
        },
        methods: {
            ...mapActions("header", ["getAutoComplete", "getCatalog"]),
            showCatalog(index) {
                clearTimeout(this.catalog.timer);
                this.catalog.timer = setTimeout(() => {
                    this.catalog.active = index
                }, 500);
            },
            clearTimer() {
                clearTimeout(this.catalog.timer)
            },
            doSearch() {
                // let kw = this.search.suggests[this.search.active];
                // if (kw) this.search.keyword = kw;
                if (!this.search.keyword) this.search.keyword = this.search.placeholder;
                this.search.active = -1;
                this.$refs.search.blur();
                this.$router.push({name: "search", params: {keyword: this.search.keyword}});
            },
            slowHidden(){
                setTimeout(()=>{
                    this.search.getFocus=false;
                },500);
            }

        },
        computed: {
            suggestIndex: {
                get() {
                    return this.search.active;
                },
                set(val) {
                    if (val < -1) val = -1;
                    if (val > this.search.suggests.length) val = this.search.suggests.length;
                    this.search.active = val;
                }
            }
        }
    }
</script>

<style scoped>
    /* header */
    .header {
        width: 1090px;
        margin: 0 auto;
    }

    .header .header-container {
    }

    .header .logo-container {
        margin-top: 24px;
    }

    .header .logo {
        display: block;
        width: 124px;
        height: 60px;
        background: url(../../assets/imgs/icon1.png) no-repeat 0 -202px;
        text-indent: -99999px;
    }

    .header .search-container {
        width: 532px;
        height: 38px;
        margin-top: 26px;
        position: relative;
    }

    .header .search-txt {
        width: 402px;
        height: 32px;
        line-height: 32px;
        padding: 2px 0 2px 38px;
        border: 1px solid #B4A078;
        border-top-left-radius: 19px;
        border-bottom-left-radius: 19px;
        font-size: 14px;
        outline: none;
        position: relative;
        z-index: 2;
        background: transparent;
    }

    .header .search-btn {
        width: 90px;
        height: 38px;
        line-height: 38px;
        border-top-right-radius: 19px;
        border-bottom-right-radius: 19px;
        background: #B4A078;
        color: #FFF;
        text-align: center;
    }

    .header .search-btn:hover {
        background: #C2AE8D
    }

    .header .search-container .icon {
        width: 14px;
        height: 14px;
        background: url(../../assets/imgs/icon1.png) no-repeat 0 -312px;
        position: absolute;
        left: 18px;
        top: 12px;
    }

    .header .search-container .placeholder {
        width: 390px;
        font-size: 14px;
        position: absolute;
        left: 38px;
        top: 9px;
        color: #999;
        z-index: 1;
    }

    .header .suggest {
        background: #FFF;
        width: 422px;
        position: absolute;
        z-index: 99;
        left: 18px;
        top: 38px;
        border: 1px solid #e8e8e8;
        /*display:none;*/
    }

    .header .suggest li {
        padding-left: 10px;
        padding-right: 12px;
        width: 400px;
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        cursor: pointer;
    }

    .header .suggest li.active {
        color: #b4a078;
        background: #f8f5f0;
    }

    .header .keyword-list {
        width: 444px;
        height: 12px;
        position: absolute;
        left: 8px;
        top: 46px;
    }

    .header .keyword-list a {
        color: #999;
        font-size: 12px;
        line-height: 12px;
        border-right: 1px solid #ccc;
        padding: 0 10px;
    }

    .header .keyword-list a.nbr {
        border-right: none;
    }

    .header nav {
        margin-top: 20px;
        position: relative;
    }

    .header .catalog-href-list {
    }

    .header .catalog-href {
        padding: 0 26px;
    }

    .header .catalog-href .title {
        display: block;
        font-size: 14px;
        font-weight: 700;
        color: #000;
        padding-bottom: 7px;
    }

    .header .catalog-href.active a, .header .catalog-href:hover a {
        color: #b4a078;
        border-bottom: 3px solid #b4a078;
    }

    .header .cart {
        width: 134px;
        height: 38px;
        margin-top: 26px;
        margin-left: 49px;
        border: 1px solid #B4A078;
        border-radius: 19px;
        line-height: 38px;
        text-align: center;
    }

    .header .cart:hover {
        background: #F5F3EF;
    }

    .header .cart span {
        color: #B4A078;
        font-size: 14px;
    }

    .header .cart i {
        display: inline-block;
        width: 19px;
        height: 19px;
        line-height: 19px;
        font-size: 12px;
        background: #d4282d;
        color: #FFF;
        border-radius: 50%;
    }


    .catalog-list {
        position: absolute;
        z-index: 9;
        top: 100%;
        left: 0;
        padding: 20px;
        padding-top: 14px;
        border: 1px solid rgba(0, 0, 0, .1);
        background: #FFF;
        /*display: none;*/
    }

    .catalog-list .catalog-column {
        width: 124px;
        margin-right: 24px;
    }

    .catalog-list .catalog-column .title {
        width: 124px;
        height: 36px;
        line-height: 36px;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: 700;
        border-bottom: 1px solid #ddd;
    }

    .catalog-list .catalog-item {
        display: block;
        width: 124px;
        height: 50px;
        overflow: hidden;
        margin-bottom: 4px;
    }

    .catalog-list .catalog-item img, .catalog-list .catalog-item span {
        float: left;
    }

    .catalog-list .catalog-item img {
        width: 50px;
        height: 50px;
    }

    .catalog-list .catalog-item span {
        margin-left: 4px;
        width: 70px;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        color: #333;
    }

    .catalog-list .catalog-item span:hover {
        color: #b4a078;
    }

</style>