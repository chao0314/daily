<template>
  <el-select v-model="ID" placeholder="请选择店铺">
    <el-option v-for="shop in shops" :key="shop.ID"
               :label="shop.title"
               :value="shop.ID"
    >
    </el-option>
  </el-select>
</template>

<script>
    export default {
        name: "ShopSelect",
        props: {
            shops: {
                type: Array,
                default: () => []
            },
            shopID: {
                type: Number
            }
        },
        data() {
            return {
                ID: ''
            }
        },

        watch: {
            ID(val) {
                console.log("watch",this.ID);
                this.$emit("input", this.ID);
            },
            shopID:{
                handler(){
                    this.ID = this.shopID;
                },
                immediate:true
            }

        }

    }
</script>

<style scoped>

</style>
