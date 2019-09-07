<template>
  <el-container>
    <el-aside>
      <el-menu :default-active="$route.name">
        <el-menu-item v-for="menu in menus" :index="menu.value" :key="menu.value" @click="$router.push(menu.value)">
          {{menu.title}}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "ComMain",
        data() {
            return {
                menus: [
                    {title: "店铺管理", value: "shop"},
                    {title: "商品管理", value: "goods"},
                    {title: "订单管理", value: "order"}
                ]
            }
        }
    }
</script>

<style scoped>

</style>
