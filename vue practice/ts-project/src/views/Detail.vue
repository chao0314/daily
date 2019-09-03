<template lang="html">
    <div>
       <comp-site-nav></comp-site-nav>
        <detail-header></detail-header>
        <div class="page">
            <detail-item-info></detail-item-info>
           <detail-info></detail-info>
        </div>
    </div>
</template>

<script lang="ts">
    import CompSiteNav from "@/components/common/CompSiteNav.vue";
    import DetailHeader from '@/components/detail/DetailHeader.vue';
    import DetailItemInfo from '@/components/detail/DetaiItemInfo.vue';
    import DetailInfo from '@/components/detail/DetailInfo.vue';

    import {Component, Vue} from 'vue-property-decorator';

    @Component({
        components: {CompSiteNav, DetailHeader, DetailItemInfo, DetailInfo}
    })
    export default class Index extends Vue {

    }
</script>

<style scoped>
    .page {
        width: 1140px;
        margin: 0 auto;
    }
</style>

<style lang="css">
    .site-nav-page {
        width: 1190px;
    }

    .container-950 {
        width: 950px;
        margin: 0 auto;
    }
</style>
