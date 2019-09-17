<template>
  <el-dialog :visible.sync="visible" :title="mode==='modify'?'修改':'添加'">
    {{data}}
    <el-form label-width="100px">

      <el-form-item label="标题">
        <el-input v-model="data.title" placeholder="输入店铺标题"></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <com-upload v-model="data.img"></com-upload>
      </el-form-item>
      <el-form-item label="banner图">
        <com-upload v-model="data.banner_img"></com-upload>
      </el-form-item>
      <el-form-item label="banner颜色">
        <el-input type="color" v-model="data.banner_color" class="width"></el-input>
      </el-form-item>
      <el-form-item label="菜单">
        <el-row type="flex" v-for="(item,index) in data.menus">
          <el-col>
            <el-input v-model="item.title" placeholder='菜单名称'></el-input>
          </el-col>
          <el-col>
            <el-input v-model="item.href" placeholder="链接地址"></el-input>
          </el-col>
          <el-col>
            <el-button type="danger" @click="data.menus.splice(index,1)">删除</el-button>
          </el-col>
          <el-col>
            <el-button type="info" @click="data.menus.push({title:'',href:''})">添加一项</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button type="default" @click="visible= false">取消</el-button>
      </el-form-item>


    </el-form>


  </el-dialog>

</template>

<script>
    import ComUpload from "./ComUpload";

    export default {
        name: "ShopDialog",
        components: {
            ComUpload
        },
        props: {
            form: {
                type: Object
            }
        },
        data() {
            return {
                visible: false,
                data: void 0
            }
        },
        computed: {
            mode() {
                return this.form ? "modify" : "increment";
            }
        },
        watch: {
            form: {
                handler() {
                    let data = this.form ? this.form.menus = JSON.parse(JSON.stringify(this.form)) : {
                        title: '',
                        img: '',
                        'banner_img': '',
                        'banner_color': '',
                        menus: [{title: '', menu: ''}]
                    };
                    if (typeof data.menus === 'string') data.menus = JSON.parse(data.menus);
                    this.data = data;
                },
                immediate: true
            }

        },
        methods: {
            submit() {
                if (this.mode === 'increment') this.$store.dispatch("createShop", this.data);
                else this.$store.dispatch("editShop", this.data);
                this.visible = false;
            },
            open() {
                this.visible = true;
            }
        }
    }
</script>

<style scoped>
  .width {
    width: 100px;
  }


</style>
