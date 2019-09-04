<template lang="html">
    <ul class="color-select">
        <li v-for="(color,index) in colors" :class="{active:index === activeIndex}" @click="select(color,index)">
            <img :src="color.img|imgPath" alt=""></li>
    </ul>
</template>

<script lang="ts">

    import {Component, Vue, Prop} from 'vue-property-decorator';
    import {color, colors} from "@/type/detail";

    @Component
    export default class ColorSelector extends Vue {
        @Prop({type: Array, default: () => []}) colors!: colors;
        private activeIndex: number = -1;

        select(color: color, index: number) {
            this.activeIndex = index;
            this.$emit("color", color);
        }
    }
</script>

<style scoped>
    .color-select {
        overflow: hidden;
    }

    .color-select li {
        float: left;
        width: 30px;
        height: 30px;
        margin-right: 5px;
        margin-bottom: 10px;
        border: 1px solid #DCDCDC;
        padding: 2px;
    }

    .color-select li.active {
        border: 2px solid #F40;
        padding: 1px;
    }
</style>

<style lang="css">

</style>
