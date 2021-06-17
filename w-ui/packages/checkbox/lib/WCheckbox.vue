<template>
  <div class="w-checkbox">
    <span class="w-checkbox__input">
      <input
          type="checkbox"
          v-model="model"
          :checked="checked"
          @change="handleChange"
          :name="name"
          :disabled="disabled"
          :indeterminate="indeterminate"
          :value="label"
      />
      <!-- vue的特点 如果对于checkbox而言 绑定的数据是数组，那么value在v-model中的数据中则被选中 -->
    </span>
    <span class="w-checkbox-label">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import useCheckbox from "./useCheckbox";


export default defineComponent({
  name: "WCheckbox",
  emits: ['change', 'update:modeValue'],
  props: {
    name: String,
    modeValue: [Boolean, String, Number],
    label: [String, Number, Boolean],
    checked: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,

  },
  setup(props, {emit}) {

    return {
      ...useCheckbox(props)

    }


  }
})
</script>

