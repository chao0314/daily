<template>
  <div :class="clazz">
    <!-- 前元素  -->
    <div v-if="$slots.prepend" class="w-input-group__prepend">
      <slot name="prepend"></slot>
    </div>
    <!-- 核心input -->
    <input
        class="w-input__inner"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
        ref="inputRef"
        :disabled="disabled"
        :readonly="readonly"
        v-bind="attrs"
        :placeholder="placeholder"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
    />
    <span v-if="prefixIcon" class="w-input__prefix">
      <i :class="prefixIcon"></i>
    </span>
    <span v-if="suffixIcon" class="w-input__suffix">
      <!-- 第一种清空 不是清空 同时没有显示密码的 -->
      <i :class="suffixIcon" v-if="!showClear && !showPwdVisible"></i>
      <i
          v-if="showClear"
          class="w-icon-delete"
          @click="clear"
          @mousedown.prevent
      ></i>
      <i
          v-if="showPwdVisible"
          class="w-icon-eye-close"
          @click="handlePasswordVisible"
      ></i>
    </span>
    <!-- 后元素  -->
    <div v-if="$slots.append" class="w-input-group__append">
      <slot name="append"></slot>
    </div>
  </div>

</template>

<script lang="ts">
import {ref, Ref, defineComponent, computed, getCurrentInstance} from 'vue'

const PENDANT_MAP = {
  suffix: 'append',
  prefix: 'prepend',
}

export default defineComponent({
  name: "WInput",
  props: {
    modelValue: {type: [String, Number], default: ""}, // v-model绑定的值
    type: {type: String, default: "text"}, // 当前input类型 password text
    placeholder: {type: String}, // 输入提示
    disabled: {type: Boolean, default: false}, // 是否禁用
    readonly: {type: Boolean, default: false}, // 是否仅读
    clearable: {type: Boolean}, // 是否带有清空按钮
    showPassword: {type: Boolean, default: false}, // 密码框是否显示密码
    suffixIcon: {type: String, default: ""}, // 前icon
    prefixIcon: {type: String, default: ""}, // 后icon
    label: {type: String}, // input配合的label属性
  },
  setup(props, {attrs, slots}) {

    const instance = getCurrentInstance();

    const clazz = computed(() => [
      "w-input",
      {
        "w-input-group": ctx.slots.prepend || ctx.slots.append,
        "w-input--prefix": props.prefixIcon,
        "w-input--suffix": props.suffixIcon || props.clearable || props.showPassword,
      },
    ]);

    const inputRef = ref<HTMLInputElement>(null);

    const setNativeInputValue = (ref: Ref) => {
      const el = ref.value;
      el.value = String(props.modelValue);
    };

    const calcIconOffset = (place: string) => {
      // 将前后icon 移动到 前位置或者后位置
      const {el} = instance.vnode;
      let ele = el.querySelector(".w-input__" + place);
      if (!ele) return;
      const pendent = PENDANT_MAP[place];
      if (slots[pendent]) {
        //w-input__prefix/suffix 为前后的 slot的 prepend/append 元素挪动 留出空余位置
        ele.style.transform = `translateX(${place === "suffix" ? "-" : ""}${el.querySelector(`.w-input-group__${pendent}`).offsetWidth}px)`;
      }

    };

    const showClear = computed( // 显示清除按钮
        () =>
            props.clearable &&
            !props.readonly &&
            !props.disabled &&
            props.modelValue
    );
    const showPwdVisible = computed( // 显示密码按钮
        () =>
            props.showPassword &&
            !props.disabled &&
            !props.readonly &&
            props.modelValue
    );
    const passwordVisible = ref(false);
    const focus = () => {
      //确保 元素更新渲染完成
      // 切换后再次获取焦点
      nextTick(() => {
        inputRef.value.focus();
      });
    };
    const handlePasswordVisible = () => { // 切换输入框显示内容
      passwordVisible.value = !passwordVisible.value;
      focus();
    };

    onMounted(() => {
      setNativeInputValue(inputRef); // 设置输入框的值
      // 更新icon位置
      calcIconOffset('suffix');
      calcIconOffset('prefix');
    });

    const clear = () => {  // 清除实现
      ctx.emit("update:modelValue", "");
      ctx.emit("change", "");
      ctx.emit("clear");
    };
    const handleInput = (e) => { // 输入事件
      let v = e.target.value;
      ctx.emit("update:modelValue", v);
      ctx.emit("input", v);
    };
    const handleFocus = (event) => { // 获取焦点
      ctx.emit("focus", event);
    };
    const handleBlur = (event) => { // 处理失去焦点
      ctx.emit("blur", event);
      zformItem.formItemMitt?.emit("z.form.blur", [props.modelValue]);
    };
    const handleChange = (event) => { // 处理事件变化
      ctx.emit("change", event.target.value);
    };
    const handleKeydown = (e) => { // 处理键盘
      ctx.emit("keydown", e);
    };


    return {
      clazz,
      inputRef
    }

  }

})
</script>

<style scoped>

</style>