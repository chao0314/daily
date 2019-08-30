<template>
    <div class="detail-bg">
        <div class="page">
            <com-crumbs></com-crumbs>
            <cmp-top></cmp-top>
            <div class="detail-prompt"></div>
            <div class="detail-content clearfix">
                <cmp-content></cmp-content>
                <cmp-hot></cmp-hot>
            </div>
        </div>
    </div>
</template>

<script>
    import ComCrumbs from "@/components/common/com-crumbs";
    import CmpContent from '@/components/detail/cmp-content';
    import CmpTop from '@/components/detail/cmp-top';
    import CmpHot from '@/components/detail/cmp-hot';

    export default {
        name: "page-detail",
        components: {
            ComCrumbs,
            CmpTop,
            CmpHot,
            CmpContent

        }
    }
</script>

<style lang="css" scoped>
    .detail-bg {
        background: #FFF;
        border-top: 1px solid #ebebeb;
    }

    /*  */
    .detail-prompt {
    }

    /*  */
    .detail-content {
        width: 1090px;
        margin-top: 30px;
    }
</style>