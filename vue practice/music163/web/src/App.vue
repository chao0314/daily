<template>
    <div class="container clearfix">
        <music-list :list="list" @change="handleChange"></music-list>
        <music-detail :detail="detail"></music-detail>
    </div>
</template>

<script>

    import MusicList from './components/music-list'
    import MusicDetail from './components/music-detail'

    export default {
        name: 'app',
        components: {
            MusicList,
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
                console.log('id is', id)
                fetch(`http://localhost:8088/api/detail/${id}`).then(res => res.json()).then(data => {
                    this.detail = data;
                    console.log(this.detail);

                });

            }
        },

        async created() {

            this.list = await (await fetch('http://localhost:8088/api/list')).json();

            this.handleChange(this.list[0].id);
            // console.log(this.list);


        }
    }
</script>

<style>
</style>
