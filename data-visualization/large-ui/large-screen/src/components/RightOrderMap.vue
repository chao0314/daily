<template>
<div>
   <v-chart autoresize  :option="option"></v-chart>
</div>
</template>

<script>
import {ref} from 'vue';
export default {
  name: "RightOrderMap",
  setup(props,ctx){

    const option = ref({});

    return {

      option
    }

  }
}
</script>

<style scoped>

</style>