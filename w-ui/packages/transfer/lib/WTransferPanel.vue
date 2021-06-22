<template>
  <div class="w-transfer-panel">
    <div class="w-transfer-panel__header">
      <w-checkbox v-model="checkAll">全选/反选</w-checkbox>
    </div>
    <div class="w-transfer-panel__body">
      <w-checkbox-group v-model="checked" @change="handleCheckChange">
        <w-checkbox v-for="item in data" :key="item.key" :label="item.key" :disabled="item.disabled">{{
            item.label
          }}
        </w-checkbox>
      </w-checkbox-group>
    </div>
  </div>

</template>

<script lang="ts">
import {defineComponent, watch, ref, reactive} from 'vue'
import WCheckboxGroup from "@w-ui/checkbox/lib/WCheckboxGroup.vue";
import WCheckbox from "@w-ui/checkbox/lib/WCheckbox.vue";
import {DataItem, ItemKey} from "./types";

export default defineComponent({
  name: "WTransferPanel",
  components: {
    WCheckbox,
    WCheckboxGroup,
  },
  props: {
    data: {
      type: Array as PropsType<DataItem>,
      default: () => []
    }

  },
  emits: ['change'],
  setup(props, {emit}) {
    const checkAll = ref(false);
    const checked = ref([]);
    const handleCheckChange = (val: ItemKey[]) => {
      emit('change', val || checked.value);
    };
    watch(() => checkAll.value, (newV: boolean) => {
      console.log(newV)
      checked.value = [];
      props.data.forEach(item => {
        if (newV && !item.disabled) checked.value.push(item.key)
      })

      emit('change',checked.value);

    })


    return {
      checked,
      checkAll,
      handleCheckChange

    }


  }


})
</script>

<style scoped>

</style>