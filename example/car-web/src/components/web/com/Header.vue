<template>
    <header class="bg-theme">
        <div class="wrap-header zerogrid">
            <div class="row">
                <div class="cssmenu">
                    <ul>
                        <li :class="{'active':$route.path ==='/' }" @click="goWhere('/')"><a href="javascript:;">首页</a>
                        </li>
                        <li><a href="javascript:;">选车</a></li>
                        <li :class="{'active':$route.path ==='/contract' }" @click="goWhere('/contract')"><a
                            href="javascript:;">联系方式</a></li>
                    </ul>
                </div>
                <a href='javascript:;' class="logo"><img src="../../../assets/logo.png"/></a>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    
    methods: {
        goWhere(path) {
            if (this.$route.path !== path) {
                this.$router.push({path});
            }
            
        }
    }
}
</script>

<style scoped>
.active {
    border-bottom: 2px solid silver;
}

</style>