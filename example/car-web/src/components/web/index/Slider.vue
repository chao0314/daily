<template>
    <div class="slider">
        <!-- Slideshow -->
        <div class="banner_container">
            <ul class="rslides banner">
                <li v-for="(banner,index) in banners" :key="banner.ID" :class="{'slider-show':active===index}">
                    <img :src="banner.image | banner" alt="">
                    <div class="caption">
                        <h1>{{ banner.title }}</h1>
                        <span>{{ banner.sub_title }}</span>
                    </div>
                </li>
            </ul>
            <a href="#" class="banner_nav prev" @click="prev">上一张</a>
            <a href="#" class="banner_nav next" @click="next">下一张</a>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
    name: "Slider",
    data() {
        return {
            active: 0
        }
    },
    computed: {
        ...mapState('web', ['banners'])
        
    },
    methods: {
        ...mapActions('web', ['getBanner']),
        prev() {
            if (this.active > 0) this.active--;
            else this.active = this.banners.length - 1;
        },
        next() {
            if (this.active < this.banners.length - 1) this.active++;
            else this.active = 0;
            
        }
    },
    created() {
        
        this.getBanner();
    }
}
</script>

<style scoped>

.slider-show {
    
    opacity: 1;
    display: block;
}

</style>