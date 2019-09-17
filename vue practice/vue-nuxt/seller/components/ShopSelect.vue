<template>
  <el-select v-model="id" placeholder="请选择店铺">
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
            id: {
                type: Number
            }
        },
        computed: {
            id: {
                get() {
                    return this.id || this.shops[0].ID || -1;
                },
                set(value) {
                    this.$emit("input", value);
                }
            }
        }

    }
</script>

<style scoped>

</style>
