<template>
  <com-main>
    <el-row>
      <el-col :span="8">
        <shop-select v-model="shopID" :shops="shops"></shop-select>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="increment">添加</el-button>
      </el-col>
    </el-row>
    <goods-dialog ref="dialog" :shops="shops" :shopID="shopID" :goods="goods"></goods-dialog>
    <el-table :data="goodsList">
      <el-table-column label="名称" prop="title"></el-table-column>
      <el-table-column label="价格" prop="price"></el-table-column>
      <el-table-column label="库存" prop="instock"></el-table-column>
      <el-table-column label="关键字" prop="keywords"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" @click="edit(scope.row)">修改</el-button>
          <el-button type="danger" @click="remove(scope.row.ID)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

  </com-main>
</template>

<script>
    import ComMain from "../components/ComMain";
    import ShopSelect from "../components/ShopSelect";
    import GoodsDialog from "../components/GoodsDialog";

    export default {
        name: "goods",
        components: {
            ComMain,
            ShopSelect,
            GoodsDialog
        },
        data() {
            return {
                shopID: void 0,
                shops: [],
                goods: void 0,
                goodsList: []
            }
        },
        methods: {
            increment() {
                this.$refs.dialog.open();
            },

            remove(id) {
                console.log(id)
            },
            edit(goods){
                this.goods = goods;
                this.$refs.dialog.open();
    }


        },
        mounted() {
            this.$store.dispatch("getShops").then(res => this.shops = res.rows);
        },
        watch: {
            shopID(val) {
                if (val) this.$store.dispatch("getShopGoods", val).then(res => {
                    this.goodsList = res.rows;
                })
            }
        }
    }
</script>

<style scoped>


</style>
