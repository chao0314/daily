<template>
  <div>
    <button type="button" class="btn btn-primary" @click="create()">添加</button>
    <banner-form :title="mode" :fields="fields" v-if="needForm" @cancel="cancel" @confirm="confirm"></banner-form>
    <banner-table :columns="columns" :rows="banners" @edit="edit" @del="del"></banner-table>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import BannerForm from "@/components/common/DialogForm";
import BannerTable from "@/components/common/Table";

export default {
  name: "BannerList",
  components: {
    BannerForm,
    BannerTable
  },
  data() {
    return {
      mode: '添加',
      columns: ['ID', '标题', '子标题', '图片'],
      banners: [],
      needForm: false,
      fields: [{name: "title", type: "text", value: "", label: "标题"},
        {name: "sub_title", type: "text", value: "", label: "子标题"},
        {name: "image", type: "file", value: "", label: "图片"}]

    }
  },
  methods: {
    ...mapActions('admin', ['getBanner', 'createBanner', 'updateBanner', 'deleteBanner']),
    create() {
      this.needForm = true;
      this.mode = '添加';
      this.selfData.ID = null;
      this.fields = this.fields.map(field => {
        field.value = "";
        return field;
      });

    },

    edit(index, [ID]) {
      this.needForm = true;
      this.mode = '修改';
      this.selfData.ID = ID;
      let banner = this.banners.find(banner => banner[0] === ID);

      for (let i = 0; i < this.fields.length; i++) {
        this.fields[i].value = banner[i + 1];

      }

    },
    del(index, [ID]) {
      this.$alert('删除？', () => {
        this.deleteBanner(ID).then(({err}) => {
          this.banners = this.banners.filter(banner => banner[0] !== ID);
        }).catch(e => this.$alert('删除失败'))
      })

    },
    cancel() {
      this.needForm = false;

    },
    confirm(payload) {
      let {ID} = this.selfData;
      if (ID) {
        //edit
        this.updateBanner({ID, data: payload}).then(() => {
          this.needForm = false;
          this.query();
        }).catch((e) => {
          console.log(e);
          this.$alert('修改失败')
        })
      } else {
        //create
        this.createBanner(payload).then(() => {
          this.needForm = false;
          this.query();
        }).catch((e) => {
          console.log(e);
          this.$alert('修改失败')
        });

      }
    },
    query() {

      this.getBanner().then(({data: banners}) => {
        this.banners = banners.map(({ID, title, sub_title, image}) => [ID, title, sub_title, image]);


      }).catch(e => this.$alert('加载失败'));
    }
  },
  created() {
    this.selfData = {
      ID: null
    };
    this.query();
  }
}
</script>

<style scoped>

</style>