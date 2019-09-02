<template lang="html">
    <div>
       <comp-site-nav></comp-site-nav>
        <div class="page">
            <search-header></search-header>
            <search-goods-list></search-goods-list>
           <search-ad-list></search-ad-list>

        </div>
    </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import CompSiteNav from "@/components/common/CompSiteNav.vue";
  import SearchHeader from "@/components/search/SearchHeader.vue";
  import SearchGoodsList from "@/components/search/SearchGoodsList.vue";
  import SearchAdList from "@/components/search/SearchAdList.vue";

    @Component({
        components: {
            CompSiteNav,
            SearchHeader,
            SearchGoodsList,
            SearchAdList
        }
    })
    export default class Search extends Vue {

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
