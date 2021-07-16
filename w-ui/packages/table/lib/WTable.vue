<template>
  <div class="w-table">
    <table v-if="height!==0" class="w-table-fixed-head" ref="fixedHeadRef">
      <thead>
      <tr>
        <th><input type="checkbox"></th>
        <th v-for="col in columns" :key="col.key">{{ col.title }}</th>
      </tr>
      </thead>
    </table>
    <div class="w-table__container" :style="style">
      <table>
        <thead v-if="height ===0">
        <tr>
          <th><input type="checkbox"></th>
          <th v-for="col in columns" :key="col.key">{{ col.title }}</th>
        </tr>
        </thead>
        <tbody ref="containerTbodyRef">
        <tr v-for="row in data " :key="row.id">
          <td><input type="checkbox"></td>
          <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
        </tr>

        </tbody>
      </table>
    </div>
  </div>

</template>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, ref} from 'vue'

type Column = { title: string, key: string }

export default defineComponent({
  name: "WTable",
  props: {
    height: {
      type: Number,
      default: 0
    },
    columns: {
      required: true,
      type: Array as PropType<Column[]>
    },
    data: {
      type: Array,
      default: () => [{}]
    },
    selected: {
      type: Array,
      default: () => []

    }

  },
  setup(props, ctx) {

    const containerPadding = ref(0);
    const fixedHeadRef = ref(null);
    const containerTbodyRef = ref(null);

    const style = computed(() => {

      const style = {};

      if (props.height > 0) {

        style['height'] = props.height + 'px';
        style['overflow-y'] = 'auto';
        style['position'] = 'absolute';
        style['top'] = 0;
        style['left'] = 0;
        style['margin-top'] = containerPadding.value + 'px';
      }
      return style

    })

    onMounted(() => {

      if (props.height) {
        containerPadding.value = fixedHeadRef.value.getBoundingClientRect().height;
        const fixedHeadThs = Array.from(fixedHeadRef.value.querySelectorAll('thead tr th'));
        const containerTbodyTdsOfFirstTr = Array.from(containerTbodyRef.value.querySelectorAll('tr:first-child td'));

        console.log(fixedHeadThs, containerTbodyTdsOfFirstTr)

        fixedHeadThs.forEach((th, i) => {
          console.log(containerTbodyTdsOfFirstTr[i].offsetWidth)
          console.log("---", th.style.width, "---")

          th.style.width = containerTbodyTdsOfFirstTr[i].offsetWidth + 'px';

        })
      }


    })


    return {
      style,
      fixedHeadRef,
      containerTbodyRef
    }


  }


})
</script>

<style scoped>

</style>