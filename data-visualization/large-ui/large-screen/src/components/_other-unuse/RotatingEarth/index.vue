<template>
  <div class="rotating-earth">
    <vue-echarts :options="options" />
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import 'echarts-gl'

  const ROOT_PATH = './'

  export default {
    name: 'RotatingEarth',
    setup() {
      const options = ref({})
      const update = () => {
        options.value = {
          globe: {
            baseTexture: `${ROOT_PATH}assets/datav-gl-texture.jpg`, // 基础纹理贴图
            heightTexture: `${ROOT_PATH}assets/datav-gl-texture.jpg`, // 高度纹理贴图
            displacementScale: 0.04, // 地球顶点位置，可以使地球更加立体
            environment: `${ROOT_PATH}assets/star-bg.jpg`, // 背景环境贴图
            shading: 'realistic',
            realisticMaterial: {
              roughness: 0.9
            },
            postEffect: {
              enable: true
            },
            light: {
              main: {
                intensity: 5,
                shadow: true
              },
              ambient: {
                intensity: 1
              }
            }
          }
        }
      }
      onMounted(update)
      return { options }
    }
  }
</script>

<style lang="scss" scoped>
  .rotating-earth {
    width: 100%;
    height: 100%;
  }
</style>
