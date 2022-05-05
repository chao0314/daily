<template>
  <div class="scroll-list">
    <div class="scroll-list__header" v-if="showHeader">
      <p v-for="item of headerValues" :style="{width:itemWidthRef}">
        {{ item }}
      </p>
    </div>
    <ul class="scroll-list__body" ref="listDomRef">
      <li v-for="(row,index) of listData"
          :class="['scroll-list__item',index%2===0?'list__item--even':'list__item--odd']">
        <p v-for="value of row" :style="{width: itemWidthRef,height:itemHeightRef}">
          {{ value }}
        </p>
      </li>
    </ul>

  </div>
</template>

<script>
import {onMounted, ref} from 'vue';


export default {
  name: "ScrollList",
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    header: {
      type: Array,
      default: () => (['h1', 'h2', 'h3'])
    },
    data: {
      type: Array,
      default: () => ([['d11', 'd1266666', 'd13', 'd14', 'd15'], ['d21', 'd22', 'd23', 'd24', 'd25']])
    },
    size: {
      type: [Number, String],
      default: 10
    },
    step: {
      type: [Number, String],
      default: 1
    },
    duration: {
      type: [Number, String],
      default: 4
    },
    delay: {
      type: [Number, String],
      default: 2
    }


  },
  setup(props, ctx) {

    const itemWidthRef = ref(0);
    const itemHeightRef = ref(0);
    const listDomRef = ref(null);
    const [headerKeys, headerValues] = props.header.reduce((accumulator, value) => {
      const [key, val] = Object.entries(value)[0];
      accumulator[0].push(key);
      accumulator[1].push(val);
      return accumulator;
    }, [[], []]);
    const listData = props.data.map(row => headerKeys.map(key => row[key]));

    onMounted(() => {
      let translateIndex = 1;
      const listDom = listDomRef.value;
      const itemHeight = listDom.offsetHeight / props.size;
      itemWidthRef.value = `${listDom.offsetWidth / props.header.length}px`;
      itemHeightRef.value = `${itemHeight}px`;

      listDom.addEventListener('transitionend', () => {

        console.log('end');
        listDom.style.transform = `translateY(-${itemHeight * translateIndex++}px)`;
      })

      setTimeout(() => {
        listDom.style.transform = `translateY(-${itemHeight * translateIndex++}px)`;

      }, props.delay * 1000)


    });


    return {
      itemWidthRef,
      itemHeightRef,
      listDomRef,
      headerValues,
      listData
    }

  }
}
</script>

<style scoped>

.scroll-list {
  height: 100%;
  overflow: hidden;
  position: relative;
}

.scroll-list__header {
  background: rgb(80, 80, 80);
  display: flex;
  font-size: 32px;
  height: 60px;
  line-height: 60px;
  position: absolute;
  z-index: 99;
  left: 0;
  top: 0;
}

.scroll-list__header > p {

  flex: auto;
  text-align: center;
}

.scroll-list__item {
  display: flex;
}

.scroll-list__body {
  background: pink;
  height: calc(100% - 60px);
  padding-top: 60px;
  transition: transform 4s ease;

}

.scroll-list__item {
  display: flex;
  font-size: 24px;
}

.scroll-list__item > p {
  flex: auto;
  /*background: #6C6C6C;*/
  /*border-right: 1px solid silver;*/
  /*border-bottom: 1px solid silver;*/
  display: flex;
  align-items: center;
  justify-content: center;
}


.list__item--odd {
  background: rgb(40, 40, 40);
}

.list__item--even {
  background: rgb(55, 55, 55);
}


</style>