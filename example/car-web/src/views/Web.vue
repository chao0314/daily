<template>
    <div>
        <index-header></index-header>
        <router-view></router-view>
        <index-footer></index-footer>
    </div>
</template>

<script>
import IndexHeader from "@/components/web/com/Header";
import IndexFooter from "@/components/web/com/Footer";
export default {
    name: "Web",
    components:{
        IndexHeader,
        IndexFooter
        
    }
}
</script>

<style scoped>

</style>