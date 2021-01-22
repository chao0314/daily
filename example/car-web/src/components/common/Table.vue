<template>
  <table class="table">
    <thead>
    <tr>
      <th v-if="check"><input type="checkbox" name="" v-model="all">全选</th>
      <th v-if="order">序号</th>
      <th v-for="column in columns">{{ column }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(row,index) in rows">
      <td v-if="check" @click="checkOne(index)"><input type="checkbox" v-model="checks[index]"></td>
      <td v-if="order">{{ index + 1 }}</td>
      <template v-for="field in row">
        <td>{{ field }}</td>
      </template>

      <td>
        <button v-if="allowEdit" type="button" class="btn btn-default" @click="edit(index,row)">修改</button>
        <button v-if="allowDel" type="button" class="btn btn-danger" @click="del(index,row)">删除</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table",
  props: {
    columns: {
      type: Array,
      required: true
    },
    rows: {
      type: Array
    },
    order: {
      type: Boolean,
      default: true
    }, allowEdit: {
      type: Boolean,
      default: true
    }, allowDel: {
      type: Boolean,
      default: true
    }, check: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      checks: [],
      all: false
    }
  },
  methods: {

    edit(index, row) {
      this.$emit('edit',index, row);
    },

    del(index) {
      if (this.checks.includes(true)) {

        let indexs = this.checks.map((v, i) => {
          if (v) return i;
        }).filter(v => v !== void 0);
        this.$emit('del', indexs);
        this.all = false;
        this.checks = [];
      } else this.$emit('del', index, row);

    },
    checkOne(index) {
      console.log(index);
      // this.$emit('checkOne', index)
    }


  },
  created() {
    this.checks = new Array(this.rows.length).fill(false);
  },
  watch: {
    all(val) {
      console.log(val)
      this.checks = new Array(this.rows.length).fill(val);

    }
  }

}
</script>

<style scoped>

</style>