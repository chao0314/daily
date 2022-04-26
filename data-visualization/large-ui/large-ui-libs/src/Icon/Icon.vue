<template>
  <div class="icon">
    <svg class="icon-svg" :style="style">
      <use :href="iconID"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: String,
    prefix: {
      type: String,
      default: 'icon'
    },
    style: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, ctx) {

    const iconID = `#${props.prefix}${props.name}`;
    return {
      iconID
    }

  }
}
</script>

<style scoped>
.icon {
  display: inline-block;
}

.icon-svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
  vertical-align: -0.15em;
}

</style>