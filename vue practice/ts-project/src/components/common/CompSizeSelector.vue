<template lang="html">
    <ul class="size-select">
        <li v-for="(size,index) in sizes" :class="{active:index === activeIndex}" @click="select(size,index)">{{size.title}}</li>
    </ul>
</template>

<script lang="ts">

    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {size, sizes} from "@/type/detail";

    @Component
    export default class SizeSelector extends Vue {
        @Prop({type: Array, default: () => []}) sizes!: sizes;
        private activeIndex:number =-1;
        private  select(size:size,index:number){
          this.activeIndex =  index;
          this.$emit("size",size);
        }
    }
</script>

<style scoped>
    .size-select {
        overflow: hidden;
    }

    .size-select li {
        float: left;
        padding: 3px 6px;
        border: 1px solid #DCDCDC;
        margin-right: 5px;
        margin-bottom: 10px;
        cursor: pointer;
    }

    .size-select li.active {
        border: 2px solid #F40;
        padding: 2px 5px;
        color: #F40;
    }
</style>

<style lang="css">

</style>
