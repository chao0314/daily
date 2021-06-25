<template>
  <div class="w-transfer">
    <w-transfer-panel :data="sourceData" @change="handleSourceChange" ref="sourceRef"></w-transfer-panel>
    <div class="w-transfer__buttons">
      <w-button icon="arrow-left-bold" @click="handleTargetToSource"></w-button>
      &nbsp;
      <w-button icon="arrow-right-bold" @click="handleSourceToTarget"></w-button>
    </div>
    <w-transfer-panel :data="targetData" @change="handleTargetChange" ref="targetRef" ></w-transfer-panel>
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from 'vue'
import WTransferPanel from "./WTransferPanel.vue";
import WButton from "@w-ui/button/lib/WButton.vue";
import {DataItem, ItemKey} from './types';

export default defineComponent({
  name: "WTransfer",
  components: {WTransferPanel, WButton},
  props: {
    modelValue: {
      type: Array as PropType<ItemKey[]>,
      default: () => []
    },
    data: {
      type: Array as PropType<DataItem[]>,
      default: () => []
    }


  },
  emits: ["update:modelValue"],
  setup(props, {emit}) {
    let sourceChecked: ItemKey[] = [], targetChecked: ItemKey[] = [];
    const sourceRef = ref(null);
    const targetRef = ref(null);

    const {sourceData, targetData} = computed(() => {
      const sourceData = ref([]);
      const targetData = ref([]);
      props.data.forEach((item: DataItem) => {

        if (props.modelValue.includes(item.key)) targetData.value.push(item);
        else sourceData.value.push(item);
      })
      return {
        sourceData,
        targetData
      }

    }).value;

    const handleSourceChange = val => {

      console.log('source change', val);
      sourceChecked = val;

    }

    const handleTargetChange = val => {
      console.log('target change', val);
      targetChecked = val
    }

    const handleTargetToSource = () => {

      targetData.value = targetData.value.filter(({key}) => !targetChecked.includes(key));

      const willMoveData = props.data.reduce((pre: DataItem[], cur: DataItem) => {
        if (targetChecked.includes(cur.key)) return pre.concat(cur);
        return pre;
      }, []);

      sourceData.value = sourceData.value.concat(willMoveData).sort((a, b) => a.key - b.key);

      emit('update:modelValue', targetData.value.map((item: DataItem) => item.key));
      sourceRef.value.handleClearChecked();
      targetRef.value.handleClearChecked();


    }

    const handleSourceToTarget = () => {

      sourceData.value = sourceData.value.filter(({key}) => !sourceChecked.includes(key));

      const willMoveData = props.data.reduce((pre: DataItem[], cur: DataItem) => {
        if (sourceChecked.includes(cur.key)) return pre.concat(cur);
        return pre;

      }, [])

      targetData.value = targetData.value.concat(willMoveData).sort((a, b) => a.key - b.key);

      emit('update:modelValue', targetData.value.map((item: DataItem) => item.key));
      sourceRef.value.handleClearChecked();
      targetRef.value.handleClearChecked();


    }



    return {
      sourceRef,
      targetRef,
      sourceData,
      targetData,
      handleSourceChange,
      handleTargetChange,
      handleTargetToSource,
      handleSourceToTarget
    }


  }


})
</script>

<style scoped>

</style>