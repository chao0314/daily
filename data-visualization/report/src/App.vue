<template>
  <report></report>
</template>

<script>

import Report from "@/views/Report";

export default {
  name: 'App',
  components: {
    Report
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


</style>
