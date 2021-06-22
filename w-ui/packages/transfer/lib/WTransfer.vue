<template>
  <div class="w-transfer">
    <w-transfer-panel :data="sourceData" @change="handleSourceChange"></w-transfer-panel>
    <div class="w-transfer__buttons">
      <w-button icon="arrow-left-bold" @click="handleTargetToSource"></w-button>
      &nbsp;
      <w-button icon="arrow-right-bold" @click="handleSourceToTarget"></w-button>
    </div>
    <w-transfer-panel :data="targetData" @change="handleTargetChange"></w-transfer-panel>
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from 'vue'
import WTransferPanel from "./WTransferPanel.vue";
import WButton from "@w-ui/button/lib/WButton.vue";
import {DataItem} from './types';

export default defineComponent({
  name: "WTransfer",
  components: {WTransferPanel, WButton},
  props: {
    modelValue: {
      type: Array as PropType<number[] | string[]>,
      default: () => []
    },
    data: {
      type: Array as PropType<DataItem[]>,
      default: () => []
    }


  },
  setup(props) {
    let sourceChecked: ItemKey[], targetChecked: ItemKey[];

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
      console.log('t to  s',targetChecked)

      targetData.value = targetData.value.filter(({key}) => !targetChecked.includes(key));
      console.log(targetData.value)


    }

    const handleSourceToTarget = () => {


    }


    return {

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