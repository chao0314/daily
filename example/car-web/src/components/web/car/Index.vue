<template>
 
        <section class="container">
            <div class="">
                <div class="wrap-container clearfix">
                    <div class="main-content">
                        <div class="wrap-box" style="background: #fff; box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.3);">
                            <!--Start Box-->
                            <div class="zerogrid">
                                <div class="header">
                                    <h1>{{ car.title }}</h1>
                                </div>
                                <div class="row">
                                    <div class="col-2-3">
                                        <div class="wrap-col">
                                            <div class="slider">
                                                <!-- Slideshow -->
                                                <div class="banner_container">
                                                    <ul class="rslides">
                                                        <li>
                                                            <img v-if="car.images" :src="car.images[0] | car"/>
                                                        </li>
                                                    
                                                    </ul>
                                                </div>
                                                <div class="clear"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-1-3">
                                        <div class="wrap-col">
                                            <p class="price">￥{{ car.price }}</p>
                                            <ul class="specs">
                                                <li v-for="feature in car.features"><strong>{{ feature.key }}</strong>
                                                    <span>{{ feature.value }}</span></li>
                                            
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="wrap-box">
                            <div class="zerogrid">
                                <div class="row">
                                    <div class="col-2-3">
                                        <div class="wrap-col">
                                            <div class="info">
                                                <h2 class="h3">车型配置</h2>
                                                <p v-for="feature in  car.features">
                                                    {{ feature.key }}：{{ feature.value }}</p>
                                            
                                            </div>
                                            
                                            <div class="info">
                                                <h2 class="h3">车辆描述</h2>
                                                
                                                <p>{{car.description}}</p>
                                            </div>
                                            <div class="info">
                                                <h2 class="h3">车辆图片</h2>
                                                <img v-for="image in car.images" :src="image | car"/>
                                            </div>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
</template>

<script>

import {mapActions} from 'vuex';

export default {
    name: "Car",
    data() {
        return {
            car: {}
        }
    },
    methods: {
        ...mapActions('web', ['getCar'])
    },
    created() {
        let {ID} = this.$route.query;
        if (ID) this.getCar({ID}).then(res => {
            this.car = res[0];
            
        })
    }
}
</script>

<style scoped>

</style>