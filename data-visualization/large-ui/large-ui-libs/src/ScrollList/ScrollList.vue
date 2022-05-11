<template>
  <div class="scroll-list">
    <div class="scroll-list__header" v-if="showHeader">
      <p v-for="item of headerValues" :style="{width:itemWidthRef}">
        {{ item }}
      </p>
    </div>
    <div class="scroll-list__container">
      <ul class="scroll-list__body" ref="listDomRef">
        <template v-for="list of listData">
          <li v-for="(row,index) of list.value"
              :class="['scroll-list__item',index%2===0?'list__item--even':'list__item--odd']">
            <p v-for="value of row" :style="{width: itemWidthRef,height:itemHeightRef,lineHeight:itemHeightRef}">
              {{ value }}
            </p>
          </li>
        </template>

      </ul>
    </div>

  </div>
</template>

<script>
import {onMounted, ref, watch, computed, onUpdated} from 'vue';


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
      type: [Number],
      default: 10
    },
    step: {
      type: [Number, String],
      default: 1
    },
    duration: {
      type: [Number, String],
      default: 1
    },
    delay: {
      type: [Number, String],
      default: 2
    },
    loop: {
      type: Boolean,
      default: false
    }


  },
  emits: ['pageEnd'],
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
    const data = computed(() => props.data.map(row => headerKeys.map(key => row[key])));
    const preListRef = ref(data.value.slice(0, props.size));
    const nextListRef = ref(data.value.slice(props.size, props.size * 2));
    let surplusIndex = data.value.length > props.size * 2 ? props.size * 2 : -1;

    const listData = [preListRef, nextListRef];
    let translateIndex = 0;

    let itemHeight = 0;
    let itemWidth = 0;

    watch(data, (newData) => {

      preListRef.value = newData.slice(0, props.size);
      nextListRef.value = newData.slice(props.size, props.size * 2);
      surplusIndex = newData.length > props.size * 2 ? props.size * 2 : -1;

    })


    onUpdated(() => {

      if (listDomRef.value) {
        setTimeout(() => {
          listDomRef.value.style.transition = `transform ${props.duration}s linear`;
          listDomRef.value.style.transform = `translateY(-${itemHeight * ++translateIndex}px)`;
        }, 0);

      }


    })

    onMounted(() => {

      const listDom = listDomRef.value;
      itemHeight = listDom.offsetHeight / props.size;
      itemWidth = listDom.offsetWidth / props.header.length;

      itemHeightRef.value = `${itemHeight}px`;
      itemWidthRef.value = `${itemWidth}px`;
      listDomRef.value.style.transition = `transform ${props.duration}s linear`;

      listDom.addEventListener('transitionend', () => {

        // console.log('end');

        if (nextListRef.value.length + (preListRef.value.length - translateIndex) === props.size) {
          translateIndex = 0;
          // console.log('pageEnd');
          ctx.emit('pageEnd');

          preListRef.value = nextListRef.value;
          if (surplusIndex !== -1) {
            listDom.style.transition = 'none';
            listDom.style.transform = 'translateY(0px)';
            const surplusData = data.value.slice(surplusIndex);
            if (surplusData.length > props.size) {

              surplusIndex += props.size;

              nextListRef.value = surplusData.slice(0, props.size);

            } else {

              if (props.loop) {
                // console.log('loop2')
                const fillDataLength = props.size - surplusData.length;
                nextListRef.value = surplusData.concat(data.value.slice(0, fillDataLength));
                surplusIndex = fillDataLength;

              } else {

                surplusIndex = -1;
                nextListRef.value = surplusData.slice(0);
              }

            }


          } else {

            if (props.loop) {

              console.log('loop');
              listDom.style.transition = 'none';
              listDom.style.transform = 'translateY(0px)';
              preListRef.value = nextListRef.value;
              nextListRef.value = data.value.slice(0, props.size);

              surplusIndex = data.value.length > props.size ? props.size : -1;


            }


          }


        } else listDom.style.transform = `translateY(-${itemHeight * ++translateIndex}px)`;


      })

      if (data.length > props.size) setTimeout(() => {
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
  width: 100%;
  background: rgb(80, 80, 80);

}

.scroll-list__header {
  background: rgb(80, 80, 80);
  display: flex;
  font-size: 32px;
  height: 60px;
  width: 100%;
  line-height: 60px;

}

.scroll-list__header > p {

  flex: auto;
  text-align: center;
  height: 100%;
}

.scroll-list__container {
  height: calc(100% - 60px);
  width: 100%;
  overflow: hidden;
}

.scroll-list__body {
  /*padding-top: 60px;*/
  height: 100%;
  width: 100%;

  background: rgb(80, 80, 80)
}

.scroll-list__item {
  display: flex;
  font-size: 24px;
}

.scroll-list__item > p {
  flex: auto;
  text-align: center;
}


.list__item--odd {
  background: rgb(40, 40, 40);
}

.list__item--even {
  background: rgb(55, 55, 55);

}


</style>