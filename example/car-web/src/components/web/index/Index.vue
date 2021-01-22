<template>
    
    <div class="wrap-body">
        
        <!--////////////////////////////////////Header-->
        <web-slider></web-slider>
        <web-filter></web-filter>
        
        <!--////////////////////////////////////Container-->
        <index-container></index-container>
        
        <!--////////////////////////////////////Footer-->
        
    </div>


</template>

<script>

import WebSlider from "@/components/web/index/Slider";
import WebFilter from "@/components/web/index/IndexFilter";

import IndexContainer from "@/components/web/index/IndexContainer";

export default {
    name: "Index",
    components: {
        WebSlider,
        WebFilter,
        
        IndexContainer
    }
}
</script>

<style scoped>

</style>