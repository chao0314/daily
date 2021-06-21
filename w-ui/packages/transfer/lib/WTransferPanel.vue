<template>
  <div class="w-transfer-panel">
    <div class="w-transfer-panel__header">
      <w-checkbox>全选/反选</w-checkbox>
    </div>
    <div class="w-transfer-panel__body">
      <w-checkbox-group>
        <w-checkbox>选项1</w-checkbox>
        <w-checkbox>选项2</w-checkbox>
        <w-checkbox>选项3</w-checkbox>
      </w-checkbox-group>


    </div>


  </div>

</template>

<script lang="ts">
import {defineComponent} from 'vue'
import WCheckboxGroup from "@w-ui/checkbox/lib/WCheckboxGroup.vue";
import WCheckbox from "@w-ui/checkbox/lib/WCheckbox.vue";

export default defineComponent({
  name: "WTransferPanel",
  components: {
    WCheckbox,
    WCheckboxGroup
  }

})
</script>

<style scoped>

</style>