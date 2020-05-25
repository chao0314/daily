<template>
  <el-dialog :visible.sync="visible" :title="mode === 'edit'?'修改':'添加'">
    {{data}}
    <el-form label-width="100px">
      <el-form-item label="所属店铺">
        <shop-select v-model="data.shopID" :shops="shops" :shopID="shopID"></shop-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="data.title"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="data.price"></el-input>
      </el-form-item>
      <el-form-item label="原价">
        <el-input v-model="data.true_price"></el-input>
      </el-form-item>
      <el-form-item label="库存量">
        <el-input v-model="data.instock"></el-input>
      </el-form-item>
      <el-form-item label="商品图">
        <com-upload v-model="data.img"></com-upload>
      </el-form-item>
      <el-form-item label="型号列表">
        <el-row v-for="(item,index) in data.sizes" :key="index">
          <el-col :span="18">
            <el-input placeholder="型号" v-model="data.sizes[index]"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="danger" @click="data.sizes.splice(index,1)">删除</el-button>
          </el-col>
        </el-row>
        <el-button type="primary" @click="data.sizes.push('')">添加</el-button>
      </el-form-item>
      <el-form-item label="颜色选择">
        <com-upload :limit="50" multiple v-model="data.colors"></com-upload>
      </el-form-item>
      <el-form-item label="放大镜图片">
        <com-upload :limit="10" multiple v-model="data.imgs"></com-upload>
      </el-form-item>
      <el-form-item label="商品信息">
        <el-row v-for="(item,index) in data.infos">
          <el-col :span="6">
            <el-input placeholder="名称" v-model="item[0]"></el-input>
          </el-col>
          <el-col :span="12">
            <el-input placeholder="内容" v-model="item[1]"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="danger" @click="data.infos.splice(index,1)">删除</el-button>
          </el-col>
        </el-row>
        <el-button type="primary" @click="data.infos.push(['',''])">添加</el-button>
      </el-form-item>
      <el-form-item label="商品详情图">
        <com-upload :limit="50" multiple v-model="data.detail_imgs"></com-upload>
      </el-form-item>
      <el-form-item label="关键字">
        <el-row v-for="(item,index) in data.keywords" :key="item">
          <el-col :span="12">
            <el-input placeholder="关键字" v-model="data.keywords[index]"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="danger" @click="data.keywords.splice(index,1)">删除</el-button>
          </el-col>
        </el-row>
        <el-button type="primary" @click="data.keywords.push('')">添加</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="visible= false">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>

    </el-form>

  </el-dialog>
</template>

<script>
    import ShopSelect from "./ShopSelect";
    import ComUpload from "./ComUpload";

    export default {
        name: "GoodsDialog",
        props: {
            goods: {
                type: Object
            },
            shops: {
                type: Array
            },
            shopID: {
                type: Number
            }

        },
        components: {
            ShopSelect,
            ComUpload
        },
        data() {
            return {
                visible: false,
                data: void 0,
                mode: ''
            }
        },
        methods: {
            submit() {
                this.data.shopID = this.shopID;
                console.log('submit', this.data);
                if (this.mode === "increment") this.$store.dispatch("incrementGoods", this.data);
                else this.$store.dispatch("editGoods", this.data);
                this.visible = false;

            },
            open() {
                this.visible = true;
            }
        },
        watch: {
            goods: {
                handler() {
                    this.data = this.goods ? JSON.parse(JSON.stringify(this.goods)) : {
                        title: '',
                        price: '',
                        true_price: '',
                        instock: '',
                        img: '',
                        sizes: [],
                        colors: [],
                        imgs: [],
                        infos: [[]],
                        detail_imgs: [],
                        keywords: [],
                    };
                    this.mode = this.goods ? "edit" : "increment";
                },
                immediate: true
            }
        }

    }
</script>

<style scoped>

</style>
