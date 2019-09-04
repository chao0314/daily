<template lang="html">
    <div>
        <comp-site-nav></comp-site-nav>
        <div class="page">
            <search-header :init-filter="filter" :page-count="data.pagecount" @change="changeFilter"></search-header>
            <search-goods-list :list="data.rows"></search-goods-list>
            <search-ad-list :ads="ads"></search-ad-list>

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Actions} from "@/decorator/Store";
    import CompSiteNav from "@/components/common/CompSiteNav.vue";
    import SearchHeader from "@/components/search/SearchHeader.vue";
    import SearchGoodsList from "@/components/search/SearchGoodsList.vue";
    import SearchAdList from "@/components/search/SearchAdList.vue";
    import {c2cData, filter, goodsAdsItem} from "@/type/search";

    @Component({
        components: {
            CompSiteNav,
            SearchHeader,
            SearchGoodsList,
            SearchAdList
        }
    })
    export default class Search extends Vue {
        @Actions search!:Function;
        @Actions getGoodsAds!:Function;
        private filter: filter = {q: '',page:1};
        private data: c2cData = {rows: [], pagecount: 0};
        private ads:goodsAdsItem[] = [];


        created() {
            let {q, page} = this.$route.query;
            if (typeof q === 'string') this.filter.q = q;
            if (typeof page === 'number') this.filter.page = page;
            this.search(this.filter).then((res:c2cData) =>{
                this.data = res;
            }).catch(()=>alert('失败'));
            this.getGoodsAds().then((res:goodsAdsItem[])=>this.ads = res).catch(()=>alert('ad failed'));
        }

        changeFilter(filter:filter){
            this.filter = filter;
            this.search(this.filter).then((res:c2cData) =>{
                this.data = res;
                console.log(this.data)
            }).catch(()=>alert('失败'));
        }

    }
</script>

<style>
    .site-nav-page {
        width: 1350px;
        margin: 0 auto;
        position: relative;
    }
</style>

<style scoped>
    .page {
        width: 1350px;
        margin: 0 auto;
        position: relative;
    }
</style>
