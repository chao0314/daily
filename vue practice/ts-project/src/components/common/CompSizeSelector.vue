<template lang="html">
  <ul class="size-select">
    <li class="active">35/S（女）</li>
    <li>36/M（女）</li>
    <li>37/L（女）</li>
    <li>38/XL（女）</li>
    <li>35/S（女）</li>
    <li>36/M（女）</li>
    <li>37/L（女）</li>
    <li>38/XL（女）</li>
    <li>35/S（女）</li>
    <li>36/M（女）</li>
    <li>37/L（女）</li>
    <li>38/XL（女）</li>
    <li>35/S（女）</li>
    <li>36/M（女）</li>
    <li>37/L（女）</li>
    <li>38/XL（女）</li>
  </ul>
</template>

<script lang="ts">

import {Component, Vue, Prop} from 'vue-property-decorator';

@Component
export default class SizeSelector extends Vue {

}
</script>

<style scoped>
.size-select {overflow:hidden;}
.size-select li {float:left;padding:3px 6px;border:1px solid #DCDCDC;margin-right:5px;margin-bottom:10px;cursor:pointer;}
.size-select li.active {border:2px solid #F40;padding:2px 5px;color:#F40;}
</style>

<style lang="css">

</style>
