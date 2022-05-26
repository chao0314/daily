<template>
    <div class="container clearfix">
        <side-navigator :list="list" @change="handleChange"></side-navigator>
        <music-detail :detail="detail"></music-detail>
    </div>

</template>

<script>
    import SideNavigator from "@/components/side-navigator";
    import MusicDetail from "@/components/music-detail";

    export default {
        name: 'app',
        components: {
            SideNavigator,
            MusicDetail
        },
        data() {
            return {
                list: [],
                detail: {}
            }
        },
        methods: {
            handleChange(id) {

                fetch(`http://localhost:8088/api/detail/${id}`).then(res => res.json()).then(data => {
                    this.detail = data;
                })


            }
        },
        async created() {

            this.list = await (await fetch('http://localhost:8088/api/list')).json();
            this.handleChange(this.list[0].id)


        }
    }
</script>

<style>
</style>
