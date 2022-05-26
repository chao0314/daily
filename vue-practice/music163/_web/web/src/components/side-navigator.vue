<template>
    <div class="cm-list fl">
        <dl class="m-brand-list">
            <dt>云音乐特色榜</dt>
            <dd v-for="(item,index) in list" :key="item.id" class="clearfix" :class="{active:index===current}"
                @click="change(index,item.id)">
                <img :src="'imgs/' +item.img" class="s-img fl" alt="">
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
        name: "side-navigator",
        props: {
            list: {
                type: Array,
                default() {
                    return [{

                        isActive: false,
                        title: "hello",
                        frequency: "every day"
                    }]

                }
            }
        },
        data() {

            return {
                current: 0

            }
        },
        methods: {

            change(index,id) {
                this.current = index;
                this.$emit('change',id);


            }

        }
    }
</script>

<style scoped>

</style>