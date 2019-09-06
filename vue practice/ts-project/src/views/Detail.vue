<template lang="html">
    <div v-if="detailItem.shop">
       <comp-site-nav></comp-site-nav>
        <detail-header :shop="detailItem.shop"></detail-header>
        <div class="page">
            <detail-item-info :goods = detailItem.goods></detail-item-info>
           <detail-info :detail="detailItem.detail"></detail-info>
        </div>
    </div>
</template>

<script lang="ts">
    import CompSiteNav from "@/components/common/CompSiteNav.vue";
    import DetailHeader from '@/components/detail/DetailHeader.vue';
    import DetailItemInfo from '@/components/detail/DetaiItemInfo.vue';
    import DetailInfo from '@/components/detail/DetailInfo.vue';
    import {Component, Vue} from 'vue-property-decorator';
    import {Actions} from "@/decorator/Store";
    import {detailItem} from "@/type/detail";

    @Component({
        components: {CompSiteNav, DetailHeader, DetailItemInfo, DetailInfo}
    })
    export default class Index extends Vue {
        @Actions getItem!:Function;
        private detailItem = {};
        created(){
            this.getItem(this.$route.query.id).then((res:detailItem)=>{
                console.log(res)
                this.detailItem = res;
            }).catch(()=>{alert("failed")})

        }

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
