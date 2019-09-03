<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
  import { Component, Vue} from 'vue-property-decorator';
  import {Actions} from "@/decorator/Store";

  @Component({
    components:{
    }
  })
  export default class App extends Vue {
    @Actions  private initUserInfo!:Function;
    created(){
      this.initUserInfo();
    }


  }
</script>

<style>
  body, ul, ol, li, p, h1, h2, h3, h4, h5, h6, form, fieldset, table, td, img, div, dl, dt, dd, input, i, b { margin: 0; padding: 0; border: 0; font-weight:normal; font-style:normal;}
  ul, ol { list-style-type: none; }
  select, input, img { vertical-align: middle; outline: none; }
  a { text-decoration: none; }
  a { blr:"expression(this.onFocus=this.blur())"}
  a { outline: none; }
  .clearfix:after { content: ""; display: block; clear: both; }
  .clearfix { zoom: 1; }
  .fl { float: left; }
  .fr { float: right; }

  b {font-weight:bold;}

  body,a {font:12px/1.5 tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;color:#3C3C3C;}
</style>
