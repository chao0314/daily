<template>
  <div class="w-transfer">
    <w-transfer-panel></w-transfer-panel>
    <div class="w-transfer__buttons">
      <w-button icon="arrow-left-bold"></w-button>
      &nbsp;
      <w-button icon="arrow-right-bold"></w-button>
    </div>
    <w-transfer-panel></w-transfer-panel>
  </div>

</template>

<script lang="ts">
import {defineComponent} from 'vue'
import WTransferPanel from "./WTransferPanel.vue";
import WButton from "@w-ui/button/lib/WButton.vue";

export default defineComponent({
  name: "WTransfer",
  components: {WTransferPanel, WButton}
})
</script>

<style scoped>

</style>