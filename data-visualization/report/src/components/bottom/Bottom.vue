<template>
  <div class="bottom">
    <BottomMap class="bottom-map"></BottomMap>
    <div class="bottom__side">
      <bottom-liquid-fill class="bottom__liquid-fill"></bottom-liquid-fill>
      <bottom-word-cloud class="bottom__word-cloud"></bottom-word-cloud>
    </div>
  </div>
</template>

<script>
import BottomMap from "@/components/bottom/BottomMap";
import BottomLiquidFill from "@/components/bottom/BottomLiquidFill";
import BottomWordCloud from "@/components/bottom/BottomWordCloud";

export default {
  name: "Bottom",
  components: {
    BottomMap,
    BottomLiquidFill,
    BottomWordCloud
  }
}
</script>

<style scoped>
.bottom {
  display: flex;
  margin-top: 20px;
}

.bottom-map {
  flex-basis: 80%;
  height: 600px;
  margin-right: 20px;

}

.bottom__side {
  flex-basis: 20%;
  height: 600px;
  display: flex;
  flex-direction: column;
}

.bottom__liquid-fill, .bottom__word-cloud {

  flex-basis: 50%;

}

.bottom__liquid-fill {
  margin-bottom: 20px;

}


</style>