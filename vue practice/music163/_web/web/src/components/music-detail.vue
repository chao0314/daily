<template>
    <div class="cm-detail fr">
        <music-detail-banner></music-detail-banner>
        <music-detail-title></music-detail-title>
        <music-detail-table :list="detail.list"></music-detail-table>
    </div>
</template>

<script>
    import MusicDetailBanner from './music-detail-banner'
    import MusicDetailTitle from './music-detail-title'
    import MusicDetailTable from './music-detail-table'

    export default {
        name: "music-detail",
        props: {
            detail: {
                require: true,
                type: Object,
                default() {
                    return {}
                }

            }
        },
        components: {
            MusicDetailBanner,
            MusicDetailTitle,
            MusicDetailTable
        }


    }
</script>

<style scoped>

</style>