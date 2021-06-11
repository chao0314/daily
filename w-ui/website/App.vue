<template>
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
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'

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


    return {
      ...toRefs(state),
      clickHandler
    };
  }


})
</script>

<style scoped>

</style>