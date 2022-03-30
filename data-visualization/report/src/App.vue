<template>
  <el-config-provider :locale="locale">
    <report></report>
  </el-config-provider>

</template>

<script>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import Report from "@/views/Report";

export default {
  name: 'App',
  components: {
    Report
  },
  setup(props, ctx) {

    return {
      locale: zhCn,
    }


  }


}
</script>

<style>
* {

  padding: 0;
  margin: 0;
  box-sizing: border-box;

}


.up-arrow {
  display: inline-block;
  border: 3px solid transparent;
  border-bottom-color: red;
  margin-bottom: 3px;
}

.down-arrow {
  display: inline-block;
  border: 3px solid transparent;
  border-top-color: green;
  margin-top: 3px;
}

.emphasis {

  color: black;
  font-weight: bold;
  margin-left: 5px;
}

ul {
  list-style: none;
}

.clear-float::after {

  content: '';
  display: block;
  clear: both;
  font-size: 0;
  width: 0;
  height: 0;
  visibility: hidden;
}


</style>
