<template>
  <form class="z-form">
    <slot></slot>
  </form>

</template>

<script lang="ts">
import {defineComponent, PropType, provide, toRefs} from 'vue'

type Rules = { [K: string]: [] };
type FormItem = { validate: (trigger: String, callback?: Function) => {} }

export default defineComponent({
  name: "WForm",
  props: {
    model: Object,
    rules: Object as PropType<Rules>
  },
  emits: ['validate'],
  setup(props) {
    const formItems = new Set<FormItem>();
    const registerItem = (formItem) => formItems.add(formItem);
    // 提供给其他组件使用 比如 表单提交按钮 submit button;
    const formValidate = (callback?: Function) => {

      let valid = true;
      let invalidFields = {};
      let count = 0;
      let promise: Promise<boolean> | undefined;
      // if no callback, return promise
      if (typeof callback !== 'function') {

        promise = new Promise((resolve, reject) => {
          callback = (valid, invalidFields) => {

            if (valid) resolve(true);
            reject(invalidFields);

          }

        })

      }

      formItems.forEach(item => {

        item.validate('', (errors, fields) => {

          if (errors) {
            valid = false;
            invalidFields = {...invalidFields, ...fields};
          }

          // 如果不使用回调 返回callback 改变上面创建的promise 状态，如果使用回调直接调用
          if (++count === formItems.size) callback(valid, invalidFields);

        })


      })

      return promise;
    }


    provide('WForm', {
      ...toRefs(props),
      registerItem,
      formValidate
    })


  }


})
</script>

<style scoped>

</style>