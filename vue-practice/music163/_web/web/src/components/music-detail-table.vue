<template>
    <div class="s-table">
        <div class="heading clearfix">
            <div class="th col-1 fl"></div>
            <div class="th col-2 fl">标题</div>
            <div class="th col-3 fl">时长</div>
            <div class="th col-3 fl">歌手</div>
        </div>
        <div class="body">
            <div class="tr clearfix" v-for="(item,index) in list" :key="item.title" :class="{even:index%2===0}">
                <div class="td col-1 center fl">
                    {{index+1}}
                </div>
                <div class="td col-2 fl">
                    {{item.title}}
                </div>
                <div class="td col-3 fl">
                    {{Math.floor(item.duration/60)}}:{{item.duration%60 }}
                </div>
                <div class="td col-3 fl">
                    {{item.artist}}
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "music-detail-table",
        props: {
            list: Array
        }
    }
</script>

<style scoped>

</style>