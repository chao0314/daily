<template>
    <div class="widget wid-post">
        <div class="wid-header">
            <h5>最新上架</h5>
        </div>
        <div class="wid-content">
            
            <div class="post" v-for="car in list"  @click="goCar(car.ID)">
                <a href="javascript:;"> <img :src="car.images[0] | car"/></a>
                <div class="wrapper">
                    <h5><a href="javascript:;">{{ car.title }}</a></h5>
                    <span>{{ (car.price / 10000).toFixed(2) }}万</span>
                </div>
            </div>
        
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: "IndexNewList",
    data() {
        
        return {
            list: []
        }
    },
    methods: {
        ...mapActions('web', ['getCar']),
        goCar(ID) {
        
            this.$router.push({path: '/car', query: {ID}})
        }
    },
    created() {
        
        this.getCar({size: 3}).then(res => {
            this.list = res;
        })
        
    }
    
}
</script>

<style scoped>

</style>