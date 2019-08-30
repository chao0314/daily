<template>
   <div>
       <com-banner></com-banner>
       <com-main></com-main>
   </div>
</template>

<script>
    import ComBanner from "../components/index/com-banner";
    import ComMain from "../components/index/com-main";
    export default {
        name: "page-index",
        components:{
            ComBanner,
            ComMain
        }
    }
</script>

<style scoped>

</style>