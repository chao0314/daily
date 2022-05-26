<template>
    <div class="cm-list fl">
        <!--        <p>{{info}}</p>-->
        <dl class="m-brand-list">
            <dt>云音乐特色榜</dt>
            <dd v-for="(item,index) in list" :key="item.id" :class="{active:cur===index}" @click="handle(index,item.id)"
                class="clearfix">
                <img :src="'imgs/'+item.img" class="s-img fl" alt="">
                <div class="s-title fl">
                    <a href="#" class="title">{{item.name}}</a>
                    <span>{{item.frequency}}</span>
                </div>
            </dd>
        </dl>
    </div>
</template>

<script>
    export default {
        name: "music-list",
        props: {
            list: {
                require: true,
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                info: "hello chao",
                cur: 0
            }
        },
        methods:{

            handle(index,id){
                this.cur =  index;
                this.$emit('change',id);
            }
        },
        created() {

        }
    }
</script>

<style scoped>

</style>