<template>
  <div class="tab">
    <div class="tab__item" v-for="(title,index) of titles"
         :class="{hover:hoverIndexRef===index,selected:selectIndexRef===index}">
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<script>
import {onMounted, onUnmounted, ref} from 'vue';

export default {
  name: "Tab",
  props: {
    titles: {
      type: Array,
      default: () => (['tab1', 'tab2', 'tab2'])
    }
  },
  setup(props, ctx) {
    let timer = null;
    const hoverIndexRef = ref(-1);
    const selectIndexRef = ref(-1);

    onMounted(() => {
      timer = setInterval(() => {

        selectIndexRef.value = ++selectIndexRef.value % props.titles.length;

      }, 1500)

    })

    onUnmounted(() => {

      clearInterval(timer);

    })

    // const handleMouseEnter =  ()=>{
    //
    // }

    return {
      hoverIndexRef,
      selectIndexRef
    }
  }
}
</script>

<style scoped>
.tab {
  height: 100%;
  display: flex;
  background: rgb(55, 55, 65);
  color: rgb(145, 160, 175);
}

.tab__item {
  /*background: pink;*/
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s ease;
}

.tab__item:not(:last-child) {
  border-right: 1px solid silver;

}

.hover {
  background: rgb(80, 80, 80);
}

.selected {
  background: rgb(140, 160, 170);
  color: white;
}

</style>