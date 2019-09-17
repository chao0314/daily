<template>
  <com-main>
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="dialogOpen">添加</el-button>
      </el-form-item>
    </el-form>

    <shop-dialog ref="shop" :form="shop"></shop-dialog>
    <el-table :data="shops">
      <el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="info" @click="edit(scope.row)">修改</el-button>
          <el-button type="danger" @click="remove(scope.row.ID)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </com-main>
</template>

<script>
    import ComMain from '~/components/ComMain.vue';
    import ShopDialog from "../components/ShopDialog";

    export default {
        name: "shop",
        components: {
            ComMain,
            ShopDialog
        },
        data() {
            return {
                shops: [],
                shop: {}
            }
        },
        mounted() {
            this.$store.dispatch("getShops").then(res => {
                console.log(res);
                this.shops = res.rows;
            }).catch(e => console.log(e));
        },
        methods: {
            dialogOpen() {
                this.shop = void 0;
                this.$refs.shop.open();
            },
            edit(data) {
                this.shop = data;
                this.$refs.shop.open();
                console.log(data)
            },
            remove(id) {
                console.log(id);
                this.shops = this.shops.filter(shop => shop.ID !== id);
                this.$store.dispatch("removeShop", id);
            }
        }
    }
</script>

<style scoped>

</style>
