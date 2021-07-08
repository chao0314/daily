<template>
  <div v-show="false">
    <div>
      <w-icon :name=iconName></w-icon>
      <w-button icon="w-icon-loading" type="primary" round @click="clickHandler">按钮</w-button>
      <w-row>
        <w-col :span="6">
          <div class="w-col-span-6" style="background: red">111ccc</div>
        </w-col>
        <w-col :span="6" :offset="6">
          <div style="background: yellow">222</div>
        </w-col
        >
        <w-col :span="6">
          <div style="background: pink">333</div>
        </w-col>
      </w-row>
      <div style="border: 3px purple solid; width: 80%; margin: 0 auto">
        <w-row :gutter="20">
          <w-col :span="8">
            <div style="background: red">111</div>
          </w-col>
          <w-col :span="8">
            <div style="background: yellow">222</div>
          </w-col>
          <w-col :span="8">
            <div style="background: pink">333</div>
          </w-col>
        </w-row>
      </div>
      <div style="border: 3px purple solid; width: 80%; margin: 0 auto">
        <w-row justify="space-around">
          <w-col :span="2">
            <div style="background: red">111</div>
          </w-col>
          <w-col :span="2">
            <div style="background: yellow">222</div>
          </w-col>
          <w-col :span="2">
            <div style="background: pink">333</div>
          </w-col>
        </w-row>
      </div>
      <w-row>
        <w-col :sm="12" :lg="6">
          <div style="background: red">111</div>
        </w-col>
        <w-col :sm="12" :lg="6">
          <div style="background: yellow">222</div>
        </w-col
        >
        <w-col :sm="12" :lg="6">
          <div style="background: pink">333</div>
        </w-col>
        <w-col :sm="12" :lg="6">
          <div style="background: yellowgreen">444</div>
        </w-col>
      </w-row>
      <br>
      <w-checkbox v-model="check">checkbox</w-checkbox>
      <p>{{ check }}</p>
      <w-checkbox-group v-model="checkGroup">
        <w-checkbox v-for="value in list" :label="value">{{ value }}</w-checkbox>
      </w-checkbox-group>
      <p>{{ checkGroup }}</p>
      <br>
      <w-transfer :data="data" v-model="transferValue"></w-transfer>
      <br>
      <button @click="handleShowMessage">show message</button>
      <br><br>

    </div>

    <div>
      <w-collapse v-model="collapseData" :accordion="false">
        <w-collapse-item title="one" name="1">
          <div> this is one collapse</div>
        </w-collapse-item>
        <w-collapse-item title="two" name="2">
          this is two collapse
        </w-collapse-item>
        <w-collapse-item title="three" name="3">
          this is three collapse
        </w-collapse-item>
      </w-collapse>
    </div>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
    </ul>
    <br>
    <w-input v-model="inputVal" v-bind="inputAttrs"></w-input>
  </div>

  <br>
  <w-form :model="formModel" :rules="rules">
    <w-form-item label="姓名" prop="name">
      <w-input v-model="formModel.name"></w-input>
    </w-form-item>
  </w-form>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref, watch, onUpdated, watchEffect} from 'vue'
import {showMessage} from "@w-ui/message";

export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({
      iconName: "loading"

    })

    let clickHandler = () => {
      console.log('button click');
    }
    setTimeout(() => {

      state.iconName = "play"
    }, 2000)

    const check = ref<boolean>(true)
    // const checkGroup = ref<string[]>(["a", "b", "c"]);
    const checkGroup = ref(["b"]);

    const list = ["a", "b", "c"]

    const generateData = (num) => {
      const data = [];
      for (let i = 1; i <= num; i++) {
        data.push({
          key: i,
          label: `option-${i}`,
          disabled: i % 4 === 0
        })

      }

      return data;

    }

    const data = generateData(10);
    const transferValue = ref([2, 3]);

    watch(() => transferValue.value, (value => console.log('transfer value', transferValue.value)));

    const handleShowMessage = () => {

      showMessage({message: 'hello message'});
    }


    const collapseData = ref([]);
    const count = ref(8)

    const load = () => {
      console.log('load');
      count.value += 2

    }


    watchEffect(() => {
      console.log('watch effect');
    })

    const inputVal = ref("input");
    const inputAttrs = reactive({a: 1});
    watch(() => inputVal.value, (val) => {
      console.log('input change', val)
    })

    // setInterval(() => inputAttrs.a = Math.random(), 1000)

    const formModel = reactive({name: "hello"});
    watch(() => formModel.name, () => {
      console.log(formModel.name);
    })

    const rules = {
      name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' }
      ]
    }
    return {
      ...toRefs(state),
      clickHandler,
      check,
      checkGroup,
      list,
      data,
      transferValue,
      handleShowMessage,
      collapseData,
      count,
      load,
      inputVal,
      inputAttrs,
      formModel,
      rules

    };
  }


})
</script>

<style scoped>
.infinite-list {

  border: 1px solid silver;
  height: 100px;

}

.infinite-list li {

  list-style-type: none;
}

</style>