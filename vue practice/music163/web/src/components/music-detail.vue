<template>
    <div class="cm-detail fr">
        <music-detail-banner></music-detail-banner>
        <music-detail-title></music-detail-title>
        <music-detail-list :list=detail.list></music-detail-list>
    </div>
</template>

<script>
    import MusicDetailBanner from './music-detail-banner'
    import MusicDetailTitle from './music-detail-title'
    import MusicDetailList from './music-detail-list'

    export default {
        name: "music-detail",
        components: {
            MusicDetailBanner,
            MusicDetailTitle,
            MusicDetailList
        },
        props: {
            detail: {
                require: true,
                type: Object,
                default() {
                    return {}
                }
            }
        }
    }
</script>

<style scoped>

</style>