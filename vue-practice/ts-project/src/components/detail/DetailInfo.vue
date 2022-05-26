<template lang="html">
    <div class="item-detail clearfix">
        <div class="detail-switch">
            <div class="switch-header">
                <a href="#" class="header-btn active">宝贝详情</a>
                <a href="#" class="header-btn">累计评论 <span>356</span></a>
                <a href="#" class="header-btn">专享服务</a>
            </div>
            <div class="switch-item active">
                <ul class="detail-list">
                    <li class="list-item" v-for="item in detail.info">
                        <i class="item-label">{{item[0]}}</i>
                        <span class="item-text">{{item[1]}}</span>
                    </li>

                </ul>
                <detail-img :imgs="detail.imgs"></detail-img>
            </div>

            <div class="switch-item">
                评论...
            </div>

            <div class="switch-item">
                服务...
            </div>
        </div>
        <detail-footer></detail-footer>
    </div>
</template>

<script lang="ts">


    import {Component, Vue, Prop} from 'vue-property-decorator';
    import DetailImg from "@/components/detail/DetailImg.vue";
    import DetailFooter from './DetailFooter.vue';
    import {detail} from "@/type/detail";


    @Component({
        components: {DetailFooter, DetailImg}
    })
    export default class DetailInfo extends Vue {
        @Prop({
            type: Object, default: () => {}
        }) detail!: detail ;


    }
</script>

<style scoped>
    /*  */
    .item-detail {
        margin-top: 30px;
        width: 1138px;
        border: 1px solid #E5E5E5
    }

    .item-detail .detail-switch {
    }

    .item-detail .switch-header {
        height: 46px;
        background: #f6f6f6
    }

    .item-detail .header-btn {
        float: left;
        width: 110px;
        height: 47px;
        padding: 0 10px;
        line-height: 46px;
        text-align: center;
        border: 1px solid #E5E5E5;
        border-top: none;
        border-bottom: none;
        margin-top: -1px;
    }

    .item-detail .header-btn.active {
        width: 110px;
        height: 45px;
        background: #FFF;
        border-top: 2px solid #F40;
        margin-top: -2px;
    }

    .item-detail .switch-item {
        display: none;
    }

    .item-detail .switch-item.active {
        display: block;
    }

    .switch-item .detail-list {
        padding: 10px 20px;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
    }

    .detail-list .list-item {
        width: 254px;
        margin-right: 20px;
        float: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

<style lang="css">

</style>
