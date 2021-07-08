<template>
  <div class="w-form-item">
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <div class="w-form-item__error" v-show="validateState !== ''">
      {{ validateMessage }}
    </div>

  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject, onMounted, ref, toRefs, provide} from 'vue'
import AsyncValidator from 'async-validator';
/*
*
* rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
*
* */

type RuleItem = {
  trigger?: string
}

export default defineComponent({
  name: "WFormItem",
  props: {
    label: String,
    prop: String
  },
  setup(props) {
    const {rules, registerItem, model} = inject('WForm', {} as any);
    const propRules = computed(() => rules?.value?.[props.prop]);
    const validateState = ref('');
    const validateMessage = ref('');
    const getMatchedTriggerRule = (propRules: RuleItem[], triggerName: string) => {

      return Array.isArray(propRules) && propRules.filter(ruleItem => {

        const {trigger = ''} = ruleItem;
        if (!trigger) return true;

        if (Array.isArray(trigger)) {

          return trigger.includes(triggerName);
        } else return trigger === triggerName;

      }).map(ruleItem => ({...ruleItem}));

    }

    const handleChange = () => {
      console.log('change')
      validate('change');
    };
    const handleBlur = () => {
      console.log('blur')
      validate('blur');
    };
    const validate = (trigger: string, callback?: Function) => {

      const matchedRules = getMatchedTriggerRule(propRules.value, trigger);

      if (!matchedRules || matchedRules.length === 0) return true;
      const descriptor = {};
      matchedRules.forEach(ruleItem => delete ruleItem.trigger);
      descriptor[props.prop] = matchedRules;

      const validator = new AsyncValidator(descriptor);
      // model 响应式数据
      const validateModel = {[props.prop]: model.value[props.prop]};
      validator.validate(validateModel, {}, (errors, fields) => {
        // 校验未通过的情况，errors 是所有错误的数组
        // fields 是一个 object，以字段作为 key 值，该字段对应的错误数组作为 value
        // （其实 fields 就是把 errors 按照原对象的 key 值分组
        validateState.value = errors ? 'error' : 'success';
        validateMessage.value = errors ? (errors[0].message ?? '验证失败') : '验证成功';
        callback?.(errors, fields);
        console.log(validateModel,"error-----", errors)

      })


    }

    //提供给父组件 或 子组件 例如 w-input 等，使用，注册事件回调等 检验所填数据
    const formItem = {
      ...toRefs(props),
      handleChange,
      handleBlur,
      validate,
      validateState,
      validateMessage

    }

    provide('WFormItem', formItem)

    onMounted(() => {
      //将 item 注册到 form 收集，便与后续有需求 统一验证验证表单各项
      registerItem(formItem);
    });

    return {

      validateState,
      validateMessage

    }


  }


})
</script>

<style scoped>

</style>