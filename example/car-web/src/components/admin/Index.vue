<template>
    <div>
        <ul class="nav nav-tabs">
            <li v-for="(tab,index) in tabs" role="presentation" :class="{active: curActive === index}"
                @click="change(index)"><a href="javascript:;">{{ tab.label }}</a>
            </li>
            
            <!--                        <li role="presentation"><a href="#">选项3</a></li>-->
        </ul>
        <component :is="curComp"></component>
    </div>

</template>

<script>
import BannerList from './BannerList';
import CarList from "./CarList";
import MessageList from "@/components/admin/MessageList";

export default {
    name: "index",
    data() {
        return {
            curComp: "BannerList",
            tabs: [{label: '轮播图', component: 'BannerList'}, {label: '汽车', component: 'CarList'}, {
                label: '留言',
                component: 'MessageList'
            }],
            curActive: 0
        }
    },
    components: {
        BannerList,
        CarList,
        MessageList
    },
    methods: {
        change(index) {
            this.curActive = index;
            this.curComp = this.tabs[index].component;
            
        }
    }
}
</script>

<style scoped>

</style>