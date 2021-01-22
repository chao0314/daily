<template>
    <section class="container">
        <div class="wrap-container clearfix">
            <div class="main-content">
                <div class="wrap-box"><!--Start Box-->
                    <div class="zerogrid">
                        <div class="header">
                            <h2>精选好车</h2>
                        </div>
                        <div class="row">
                            <div class="col-1-3" v-for="item in recommends">
                                <div class="wrap-col">
                                    
                                    <div class="item t-center" v-for="recommend in item">
                                        <div class="item-container">
                                            <a href="javascript:;" @click="goCar(recommend.ID)">
                                                <div class="item-caption">
                                                    <div class="item-caption-inner">
                                                        <div class="item-caption-inner1">
                                                            <span>{{
                                                                    recommend.features[0].value
                                                                }} / {{
                                                                    recommend.features[1].value
                                                                }} / {{
                                                                    recommend.features[2].value
                                                                }} / {{ recommend.features[3].value }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <img :src="recommend.images[0] | car"/>
                                            </a>
                                        </div>
                                        <div class="item-info">
                                            <a href="javascript:;" @click="goCar(recommend.ID)"><h3>{{ recommend.title }}</h3></a>
                                            <p>{{ parseInt(recommend.features[1].value) }}万公里
                                                ￥{{ (recommend.price / 10000).toFixed(2) }}万</p>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </div>
                <div class="wrap-box t-center"
                     style="background: #fff; box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);"><!--Start Box-->
                    <div class="zerogrid">
                        <div class="header">
                            <h2>两亿元用户保障金</h2>
                        </div>
                        <strong>重大事故车投诉专线：拨打400-861-0500转6 专人接待</strong>
                        <p>
                            安全有保障：严格的检测把关，拒绝重大事故车，只为更安全<br/>
                            车源有保障：249项专业检测，精选放心车源，拒绝重大事故车、水泡车、火烧车<br/>
                            车源有保障：精选优质车源，从源头上把控质量
                        </p>
                    </div>
                </div>
                <index-car-list></index-car-list>
            </div>
        </div>
    </section>
</template>

<script>
import IndexCarList from "@/components/web/index/IndexCarList";
import {mapActions} from 'vuex';

export default {
    name: "IndexContainer",
    components: {
        IndexCarList
    },
    data() {
        return {
            recommends: []
        }
    },
    
    methods: {
        ...mapActions('web', ['getRecommend']),
        goCar(ID) {
            
            this.$router.push({path: '/car', query: {ID}})
        }
    },
    created() {
        
        this.getRecommend().then(data => {
            
            
            let mid = Math.ceil(data.length / 2);
            for (let i = 0; i < mid; i++) {
                this.recommends.push([data[i], data[mid + i]]);
                
            }
            
            
        })
        
    }
}
</script>

<style scoped>

</style>