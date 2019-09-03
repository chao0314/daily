<template>
    <div>
<!--        <router-link to="/detail">detail</router-link>-->
<!--        <a href="/shop">shop</a>-->
        <comp-site-nav></comp-site-nav>
        <index-header></index-header>
        <div class="index-page">
            <index-nav></index-nav>
            <index-recommend-list :keywords="keywords" :list="list"></index-recommend-list>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import CompSiteNav from "@/components/common/CompSiteNav.vue";
    import IndexHeader from "@/components/index/IndexHeader.vue";
    import IndexNav from "@/components/index/IndexNav.vue";
    import IndexRecommendList from "@/components/index/IndexRecommendList.vue";
    import {Actions} from "@/decorator/Store";
    import {HotItem, HotKeyword} from "@/type";


    @Component({
        components: {
            IndexNav,
            CompSiteNav,
            IndexHeader,
            IndexRecommendList
        }
    })
    export default class extends Vue {
        @Actions
        getHotKeyword!:Function;
        @Actions
        getHotList!:Function;
        private keywords:HotKeyword[] = [];
        private list:HotItem[]=[];

        created(){
            Promise.all([this.getHotKeyword(),this.getHotList()]).then(([keywords,hotlist])=>{
                // console.log("keyword",keywords);
                // console.log("hotlist",hotlist);
                this.keywords = keywords;
                this.list = hotlist;
            }).catch(err=>{
                console.log(err);
            })
        }

    }
</script>

<style>
    .site-nav-page {
        width: 1090px;
        margin: 0 auto;
    }

    .index-page-container {
        width: 1190px;
        margin: 0 auto;
    }

</style>