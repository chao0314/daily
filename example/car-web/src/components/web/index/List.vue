<template>
    <div class="wrap-col">
        
        
        <div v-for="car in list" class="row" :id="car.ID">
            <div class="item">
                <div class="col-1-3">
                    <div class="item-container">
                        <a href="javascript:;" @click="goCar(car.ID)">
                            <div class="item-caption">
                                <div class="item-caption-inner">
                                    <div class="item-caption-inner1">
                                        <span>{{
                                                car.features[0].value
                                            }} / {{
                                                car.features[1].value
                                            }} / {{
                                                car.features[2].value
                                            }} / {{ car.features[3].value }}</span>
                                    </div>
                                </div>
                            </div>
                            <img :src="car.images[0] | car"/>
                        </a>
                    </div>
                </div>
                <div class="col-2-3">
                    <div class="wrap-col">
                        <div class="item-info">
                            <a href="javascript:;" @click="goCar(car.ID)"><h3>{{ car.title }}</h3></a>
                            <p>{{ parseInt(car.features[1].value) }}万公里 ￥{{ (car.price / 10000).toFixed(2) }}万</p>
                            <p>{{ car.description }}</p>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        
        <div class="row">
            <a :href="list.slice(-1).ID" class="button bt1" @click="getMore">加载更多</a>
        </div>
    
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    name: "List",
    data() {
        return {
            list: [],
            page: 1
        }
    },
    methods: {
        ...mapActions('web', ['getCar']),
        getMore() {
            this.getCar({page: this.page}).then(res => {
                this.list.push(...res);
                this.page++;
            })
            
        },
        goCar(ID) {
            console.log(ID)
            this.$router.push({path: '/car', query: {ID}})
        }
        
        
    },
    created() {
        this.getMore();
    }
    
    
}
</script>

<style scoped>

</style>